const { BigQuery } = require("@google-cloud/bigquery");
const bigquery = new BigQuery();

class Warehouse {
  constructor({ datasetName, location }) {
    this.datasetName = datasetName;
    this.dataset = bigquery.dataset(datasetName);
    this.location = location;
  }

  async loadAndUpdateSchema(tableName, schemaPath) {
    const options = {
      autodetect: true,
      sourceFormat: "NEWLINE_DELIMITED_JSON", 
      location: this.location,
      schemaUpdateOptions: ['ALLOW_FIELD_ADDITION'],
    };

    const [table] = await this.dataset.table(tableName).load(
      schemaPath,
      options,
    );
    return table;
  }

  async getLatestRecordTime(tableName, dateColumn) {
    /* 
		Returns the latest record from BigQuery, sorted using dateColumn
		*/
    const sqlQuery = `SELECT *
					FROM \`${this.datasetName}.${tableName}\`
					ORDER BY ${dateColumn} DESC`;

    const options = {
      query: sqlQuery,
      location: this.location,
    };
    const [rows] = await bigquery.query(options);

    const date = rows.length ? rows[0][dateColumn]?.value : 0 
    return date ? new Date(date) : new Date(0)
  }

  async insertRows(tableName, rows) {
    const options = {
      schemaUpdateOptions: ['ALLOW_FIELD_ADDITION'],
    }
    return this.dataset.table(tableName).insert(rows, options);
  }
}

module.exports = (settings) => {
  return new Warehouse(settings);
};
