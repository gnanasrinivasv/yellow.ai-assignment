const axios = require('axios');

module.exports = async (data) => {
    try {
        // 1. Extract dynamic user input from bot variables
        // This could be an 'orderId', 'productName', or 'leadName'
        const userQuery = data.variables.userQuery || 'default';
        
        // 2. Define your Beeceptor Mock URL
        // Replace this with the actual URL you created on Beeceptor.com
        const MOCK_API_URL = "https://your-project-repo.free.beeceptor.com/api/v1/data";

        // 3. Execute the API Call
        const response = await axios.get(MOCK_API_URL, {
            params: { id: userQuery },
            timeout: 5000 // Best practice for bot responsiveness
        });

        // 4. Extract and sort the information from the API response
        if (response.data) {
            const apiResult = response.data;

            // Log for debugging (visible in Yellow.ai Cloud Function logs)
            console.log("Successfully fetched data for query:", userQuery);

            // 5. Return the data to the bot flow
            return {
                status: "success",
                resultMessage: I found the following information: ${apiResult.description || 'No description available'},
                retrievedData: apiResult,
                found: true
            };
        } else {
            return {
                status: "success",
                resultMessage: "I couldn't find any information regarding that request.",
                found: false
            };
        }

    } catch (error) {
        // Essential Error Handling for the Solution Engineer Role
        console.error("API Integration Error:", error.message);
        
        return {
            status: "error",
            resultMessage: "I'm having trouble connecting to the database right now. Please try again later.",
            errorMessage: error.message
        };
    }
};
