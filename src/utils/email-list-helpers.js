const axios = require('axios');

async function addUserToEmailList(email, name) {
  const formId = 6288495;
  const apiKey = process.env.CONVERT_KIT_API_KEY; // Replace this with your actual ConvertKit API key
  const url = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;

  const data = {
    api_key: apiKey,
    email: email,
    first_name: name, // Assuming you want to use the name parameter as the first name
    subDate: new Date().toISOString(),
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    console.log(response.data);
    return response.data; // Returning the Axios response data might be useful for further processing
  } catch (error) {
    console.error("Failed to add user to email list:", error);
    // Rethrow the error if you want to handle it outside this function
    // Axios wraps the error as error.response for HTTP status codes that are outside the 2xx range
    throw (error.response ? error.response.data : error);
  }
}

module.exports = { addUserToEmailList };