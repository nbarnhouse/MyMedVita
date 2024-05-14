<br />
<div align="center">
  <a href="https://github.com/AlvinGraham/MyMedVita">
    <img src="../public/MMV - Final Logo White.png" alt="BrandLogo" width="80" height="80">
  </a>

  <h3 align="center">MyMedVita DATABASE DOCUMENTATION</h3>

  <p align="center">
    <a href="../README.md">Return to README</a>
  </p>
</div>

The application's database is a relational [Postgres](https://www.postgresql.org/download/) database of nine tables.

---

Entity Relationship Diagram (ERD)

<img src="./images/ERD.png" alt="Entity Relationship Diagram">

---

Tables

- **users** - used to store authentication data. username and email fields are unique as the email is used to identify a user account. Normally numeric fields (e.g. zip and phone) are stored as text to account variable formats
- **user_account_type** - used to store account types by user. This table is for future use to allow users to have a specified account type (e.g. user, admin, TPA, etc...). The specific allowable user types are defined in the **account_types** table. Since the user_id field is NOT UNIQUE, a specific user may hold more than one account type. If it is desired for a user to hold only one account type, the user_id field should be made unique.
- **account_types** - used to store valid account types. access_levels should be unique and always be a power of 2 in order to allow for bitwise mask comparison of multiple account types.
- **rates** - used to store current rate and provider data. This will easily be the largest of all data tables.
  Note: provider_phone and provider_zip stored as varchars to account for variance in source formatting
- **service_codes** - used to store procedure codes (CPT Codes) and associated descriptions. The type_id field is used to relate each code to a category.
- **service_types** - used to store categories/types of service (e.g. Outpatient, Labs, Radiology, etc…). data_group field is used to store the source of that particular category
- **user_searches** - used to store user searches by individual user
- **insurance_providers** - used to store insurance providers. insurer_code must be unique and a power of two to allow for bitwise mask comparison of multiple providers
- **geo_zip** - used to store lat/long of known zip codes

---

Database Installation

1. Ensure [PostgreSQL](https://www.postgresql.org) is installed in your development or deployment environment.
2. Use [Postico](https://eggerapps.at/postico2/) or your choice of DB interfaces to run the database.sql file. Do not alter the order of sql instructions as the file is designed to build the dependencies in order.
3. Import the CSV data files as detailed in the database.sql file. Do not alter the order of imports as dependant tables must be populated first.
4. If you are installing to a deployed environment, you must set a DATABASE_URL environment variable (e.g. DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/prime_app) in your deployment environment so that the server APIs can interact with the database.

---

  <p align="center">
    <a href="../README.md">Return to README</a>
  </p>
