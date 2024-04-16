const createRecipient = async (req, res) => {
  const { firstName, city, phoneNumber, selectedCountry } = req.body;
  try {
    // Validate required fields
    if (!city || !phoneNumber || !firstName || !selectedCountry) {
      const errors = {};
      if (!city) {
        errors.city = "City is required";
      }
      if (!phoneNumber) {
        errors.phoneNumber = "Phone number is required";
      }
      if (!firstName) {
        errors.firstName = "First name is required";
      }
      if (!selectedCountry) {
        errors.selectedCountry = "Selected country is required";
      }

      return res.status(400).json({ status: "fail", errors });
    }

    // Create the recipient object
    const recipient = {
      firstName,
      city,
      phoneNumber,
      selectedCountry,
    };

    // Add the recipient to the user's recipients array
    req.user.recipients.push(recipient);
    await req.user.save();

    res.status(201).json(recipient);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRecipients = async (req, res) => {
  try {
    // Extract the recipients from the user object
    const recipients = req.user.recipients;

    res.status(200).json({ recipients });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.createRecipient = createRecipient;
exports.getRecipients = getRecipients;
// exports.deleteRecipient = base.deleteOne(Recipient);
