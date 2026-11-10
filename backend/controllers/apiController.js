
const apiService = require("../services/apiService");

// Retrieve Alloy parameters
exports.getParameters = async (req, res) => {
  try {
    const result = await apiService.getParameters();

    return res.status(200).json(result);

  } catch (error) {
    console.error("Alloy parameters error:", error.message);

    return res.status(502).json({
      message: "Unable to retrieve Alloy parameters"
    });
  }
};

// Submit applicant for evaluation
exports.submitForm = async (req, res) => {
  try {
    const applicantData = req.body;

    if (
      !applicantData ||
      typeof applicantData !== "object" ||
      Array.isArray(applicantData) ||
      Object.keys(applicantData).length === 0
    ) {
      return res.status(400).json({
        message: "Applicant data is required"
      });
    }

    const result = await apiService.submitEvaluation(
      applicantData
    );

    return res.status(result.status).json({
      successs: true,
      data: result
    });

  } catch (error) {
    console.error("Alloy evaluation error:", error.message);

    return res.status(502).json({
      message: "Unable to submit applicant for evaluation"
    });
  }
};
