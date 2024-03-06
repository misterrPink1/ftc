import { magic } from '../../lib/magic'
import { setLoginSession } from '../../lib/auth'
import dbConnect from '../../lib/dbConnect'
import User from '../../models/Users'
import { addUserToEmailList } from '../../utils/email-list-helpers'

export default async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).end();
    await dbConnect()

    const didToken = req.headers.authorization.slice(7)
    const metadata = await magic.users.getMetadataByToken(didToken)
    let user = await User.findOne({ email: metadata.email })

    if (!user) {
      try {
        user = await User.create({
          name: req.body.name,
          email: metadata.email,
          mgkpublicAddress: metadata.publicAddress,
          confirmedAt: metadata.confirmedAt ? new Date(metadata.confirmedAt) : null,
          lastLoginAt: metadata.lastLoginAt ? new Date(metadata.lastLoginAt) : null,
          mgkIssuer: metadata.issuer,
          metadata: metadata.metadata,
        });

        // If the creation is successful, user will be the created document
        // No need for the previous check as an unsuccessful creation would have thrown an error

        let newSession = { ...metadata, userId: user._id, name: user.name};
        await setLoginSession(res, newSession);
        /*try {
          await addUserToEmailList(metadata.email, req.body.name);
        } catch (error) {
          console.error(error, "Error in adding user to email list");
        }*/
        res.status(200).send({ done: true, newUser: user });
      } catch (error) {
        console.error(error, "Error in user creation or session setting");
        res.status(500).send("Internal Server Error");
      }
    } else {
      // User found in the database
      const session = { ...metadata, userId: user._id };
      await setLoginSession(res, session);
      res.status(200).send({ done: true, session, 'user': user });
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send(error.message);
  }
}

/**
 * form id could be:
 * 
 * <script async data-uid="4b79702b9f" src="https://misterrpink.ck.page/4b79702b9f/index.js"></script>
 * 6288495
 * 
 * looks like: 6288495 it is
 */