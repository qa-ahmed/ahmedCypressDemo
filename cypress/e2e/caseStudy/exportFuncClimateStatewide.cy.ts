describe(`Export functionality of NOAA's 'Climate at a Glance' statewide data`, () => {

    beforeEach(() => {
        cy.visit('https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/statewide/mapping');
    })

    /* This test verifies
    * exported csv data matches the source data
    * all relevant climate details are included in the export
    */
    it('CSV data matches source data', () => {
        downloadFile('CSV');
        cy.readFile('cypress/downloads/data.csv').then((csvData) => {
            // Remove commented lines starting with # 
            const rowsWithHeaders = csvData.split('\n').filter(row => !row.startsWith('#'));
            // Set the first row as the header
            const headers = rowsWithHeaders[0].split(',');
            // Slice the header row to get the data rows 
            const dataRows = rowsWithHeaders.slice(1).filter(row => !row.startsWith('\n'));

            //validate csv header content against source table column headers
            cy.get('table').find('th').as('header');
            expect(headers[1]).to.equal('Name') && cy.get('@header').contains('State');
            expect(headers[2]).to.equal('Value') && cy.get('@header').contains('Value');
            expect(headers[3]).to.contain('Anomaly (1901-2000 base period)') && cy.get('@header').contains('Anomaly');
            expect(headers[4]).to.equal('Rank') && cy.get('@header').contains('Rank130 Years');
            expect(headers[5]).to.contain('1901-2000 Mean') && cy.get('@header').contains('1901-2000 Mean');

            //validate csv body content against source table rows
            cy.get('table')
                .find('tbody')
                .find('tr')
                .as('rowData');

            cy.get('@rowData').then((elements) => {
                let numOfRowsOnWebtable = elements.length;
                for (let i = 1; i < numOfRowsOnWebtable; i++) {
                    const cellDataCSV = dataRows[i].split(',');
                    const nameCSV = cellDataCSV[1];
                    const valueCSV = cellDataCSV[2];
                    const anomalyCSV = cellDataCSV[3];
                    const rankCSV = cellDataCSV[4];
                    const meanCSV = cellDataCSV[5];

                    cy.get('@rowData').contains(nameCSV);
                    cy.get('@rowData').contains(valueCSV);
                    cy.get('@rowData').contains(anomalyCSV);
                    cy.get('@rowData').contains(rankCSV);
                    cy.get('@rowData').contains(meanCSV);
                }
            })
        });

    });

    /* This test verifies
     * CSV file structure, data types and syntax
     */
    it('CSV file data type and syntax are valid', () => {
        downloadFile('CSV');
        cy.readFile('cypress/downloads/data.csv').then((csvData) => {
            // Remove commented lines 
            const rowsWithHeaders = csvData.split('\n').filter(row => !row.startsWith('#'));
            // Set the first row as the header
            const headers = rowsWithHeaders[0].split(',');
            // Slice the header row to get the data rows 
            const dataRows = rowsWithHeaders.slice(1).filter(row => !row.startsWith('\n'));

            //validate csv header titles
            expect(headers[0]).to.equal('ID');
            expect(headers[1]).to.equal('Name');
            expect(headers[2]).to.equal('Value');
            expect(headers[3]).to.contain('Anomaly (1901-2000 base period)');
            expect(headers[4]).to.equal('Rank');
            expect(headers[5]).to.contain('1901-2000 Mean');

            //validate csv data
            let numOfRows = dataRows.length;
            //valid state name
            const positiveIntNumberRegex = /^\d+$/;
            const stateRegex = /^(Alabama|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming)$/;
            const temperatureRegex = /^\d+(\.\d{1})?$/;

            for (let i = 0; i < numOfRows - 1; i++) {
                const cellDataCSV = dataRows[i].split(',');
                const idCSV = cellDataCSV[0];
                const nameCSV = cellDataCSV[1];
                const valueCSV = cellDataCSV[2];
                const anomalyCSV = cellDataCSV[3];
                const rankCSV = cellDataCSV[4];
                const meanCSV = cellDataCSV[5];

                expect(idCSV).to.match(positiveIntNumberRegex);
                expect(nameCSV).to.match(stateRegex, `${nameCSV} is not a valid state name according to the regex.`);
                expect(valueCSV).to.match(temperatureRegex);
                expect(anomalyCSV).to.match(temperatureRegex);
                expect(rankCSV).to.match(positiveIntNumberRegex);
                expect(meanCSV).to.match(temperatureRegex);
            }
        });
    });

    /* This test verifies
    * exported JSON data matches the source data
    * all relevant climate details are included in the export
    */
    it('JSON data matches source data', () => {
        downloadFile('JSON');
        cy.readFile('cypress/downloads/data.json').then((jsonData) => {
            //validate headers
            expect(jsonData.description.title).contain('December 2024 Contiguous U.S. Statewide Average Temperature')
            expect(jsonData.description.anomalies).contain('1901-2000 base period')
            expect(jsonData.description.units).contain('Degrees Fahrenheit')
            expect(jsonData.description.mean).contain('1901-2000')

            cy.get('table')
                .find('tbody')
                .find('tr')
                .as('rowData');

            //validate json data against webtable
            const numOfStateData = Object.keys(jsonData.data).length;
            for (let i = 1; i <= numOfStateData; i++) {
                const stateNameJSON = jsonData.data[i].state;
                const valueJSON = jsonData.data[i].value;
                const anomalyJSON = jsonData.data[i].anomaly;
                const rankJSON = jsonData.data[i].rank;
                const meanJSON = jsonData.data[i].mean;

                cy.get('@rowData').eq(i - 1).contains(stateNameJSON);
                cy.get('@rowData').eq(i - 1).contains(valueJSON);
                cy.get('@rowData').eq(i - 1).contains(anomalyJSON);
                cy.get('@rowData').eq(i - 1).contains(rankJSON);
                cy.get('@rowData').eq(i - 1).contains(meanJSON);
            }

        });
    });

    /* This test verifies
     * JSON file structure, data types and syntax
     */
    it('JSON syntax is valid', () => {
        downloadFile('JSON');
        cy.readFile('cypress/downloads/data.json').then((jsonData) => {
            const isValidJson = Cypress._.attempt(() => JSON.parse(jsonData));
            // Verify if JSON is valid
            cy.log(jsonData);
            cy.wrap(isValidJson).should('not.have.property', 'name', 'Error');
        });
    });

    function downloadFile(fileType: string) {
        cy.contains(fileType.toUpperCase())
            .scrollIntoView()
            .as('downloadLink')
            .click();

        cy.wait(3000);
    }
});