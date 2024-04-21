CREATE TABLE IF NOT EXISTS "users" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"username" text UNIQUE,
	"password" text NOT NULL,
	"access_level" text NOT NULL DEFAULT 'user',
	"phone" text,
	"first_name" text,
	"last_name" text,
	"email" text,
	"dob" date,
	"gender" text,
	"street_address" text,
	"city" text,
	"state" text,
	"zip" text,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "service_types" (
	"id" bigint NOT NULL UNIQUE,
	"service_type" text NOT NULL,
	"data_group" text,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "service_codes" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"primary_code" bigint NOT NULL UNIQUE,
	"description" text,
	"type_id" bigint NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "rates" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"CPT_CODE" bigint NOT NULL,
	"negotiated_rate" numeric(10,0) NOT NULL,
	"provider_organization_name" text,
	"provider_last_name" text,
	"provider_first_name" text,
	"provder_credential" text,
	"provider_phone" text,
	"provider_address" text,
	"provider_city" text,
	"provider_state" text,
	"provider_zip" text,
	"CMS_Specialty_Name" text,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "user_searches" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"user_id" bigint NOT NULL,
	"CPT_Code" bigint NOT NULL,
	"search_zip" text NOT NULL,
    "search_distance" bigint NOT NULL,
	PRIMARY KEY ("id")
);



ALTER TABLE "service_codes" ADD CONSTRAINT "service_codes_fk3" FOREIGN KEY ("type_id") REFERENCES "service_types"("id");
ALTER TABLE "rates" ADD CONSTRAINT "rates_fk1" FOREIGN KEY ("CPT_CODE") REFERENCES "service_codes"("primary_code");
ALTER TABLE "user_searches" ADD CONSTRAINT "user_searches_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "user_searches" ADD CONSTRAINT "user_searches_fk2" FOREIGN KEY ("CPT_Code") REFERENCES "service_codes"("primary_code");