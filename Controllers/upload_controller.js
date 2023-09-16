// CSV-parser used for csv-parser can convert CSV into JSON
const csv = require("csv-parser");
//The NPM FS module includes all the functions necessary to read, write, and delete files on the local computer.
const fs = require("fs");
const path = require("path");
const Upload = require("../models/upload");

module.exports.view = (req, res) => {
  const fileId = req.params.fileId;
  const searchQuery = req.query.serachs; // Get the search query from the URL query parameters

  Upload.findById(fileId)
    .then((file) => {
      if (!file) {
        return res.status(404).send("Files are not found");
      }

      const filePath = path.join(__dirname, "../uploads", file.filename);

      // Check if the file exists before attempting to read it
      const fileExists = fs.existsSync(filePath);
      if (!fileExists) {
        console.error(`Files are not found at path: ${filePath}`);
        return res.status(404).send("Files are not found");
      }

      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
          results.push(data);
        })
        .on("end", () => {
          if (results.length === 0) {
            return res.status(404).send("No data found in the CSV file");
          }

          const tableHeaders = Object.keys(results[0]);
          let tableRows = results;

          if (searchQuery) {
            // Filter the tableRows based on the search query
            tableRows = tableRows.filter((row) =>
              Object.values(row).some((value) =>
                value.toLowerCase().includes(searchQuery.toLowerCase())
              )
            );
          }

          res.render("csvfilereader", {
            title: "CSV File Reader",
            file,
            tableHeaders,
            tableRows,
            searchQuery,
          });
        })
        .on("error", (error) => {
          console.error("CSV file parsing error:", error);
          res.status(500).send("Error parsing CSV file");
        });
    })
    .catch((error) => {
      console.error("File retrieval error:", error);
      res.status(500).send("Internal Server Error");
    });
};

