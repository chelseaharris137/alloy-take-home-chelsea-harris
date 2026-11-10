
const BASE_URL = process.env.ALLOY_BASE_URL;

const getAuthHeaders = () => {
  const token = process.env.ALLOY_WORKFLOW_TOKEN;
  const secret = process.env.ALLOY_WORKFLOW_SECRET;

  if (!token || !secret) {
    throw new Error("Alloy credentials are missing");
  }

  const credentials = Buffer
    .from(`${token}:${secret}`)
    .toString("base64");

  return {
    "Authorization": `Basic ${credentials}`,
    "Content-Type": "application/json",
    "Accept": "application/json"
  };
};

exports.getParameters = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/v1/parameters/`,
      {
        method: "GET",
        headers: getAuthHeaders(),
        signal: AbortSignal.timeout(15000)
      }
    );

    const responseText = await response.text();

    console.log("Alloy Status:", response.status);
    console.log("Alloy Response:", responseText);

    if (!response.ok) {
      throw new Error(
        `Alloy returned ${response.status}: ${responseText}`
      );
    }

    return JSON.parse(responseText);

  } catch (error) {
    console.error("Alloy API Error:", error);
    throw error;
  }
};

// POST: Submit applicant for evaluation
exports.submitEvaluation = async (applicantData) => {
  const response = await fetch(
    `${BASE_URL}/v1/evaluations/`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(applicantData),
      signal: AbortSignal.timeout(15000)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Alloy evaluation failed (${response.status})`);
  }

  return data;
};
