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

  async getLatestRecord(tableName, dateColumn) {
    /* 
		Returns the latest record from BigQuery, sorted using dateColumn
		*/
    const sqlQuery = `SELECT *
					FROM \`${this.datasetName}.${tableName}\`
					ORDER BY @dateColumn DESC
					LIMIT 1`;

    const options = {
      query: sqlQuery,
      location: this.location,
      params: { dateColumn },
    };

    return bigquery.query(options);
  }

  async insertRows(tableName, rows) {
    return await self.dataset.table(tableName).insert(rows);
  }
}

module.exports = (settings) => {
  return new Warehouse(settings);
};
