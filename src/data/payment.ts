/** Single source of truth for the /pay page's bank and UPI details. */
export const bankDetails = {
  accountName: "Saildeck Maritime Pvt Ltd",
  accountNumber: "10260636840",
  ifsc: "IDFB0040105",
  bankName: "IDFC FIRST Bank",
  branch: "",
  accountType: "Current",
  /** SWIFT/BIC — only needed for international wire transfers. Leave blank
   *  to hide the row on /pay if you don't need this. */
  swift: "",
};

export const upi = {
  /** Your real UPI VPA, e.g. "saildeckmarine@okaxis". */
  vpa: "saildeck@upi",
  payeeName: "Saildeck Maritime",
};
