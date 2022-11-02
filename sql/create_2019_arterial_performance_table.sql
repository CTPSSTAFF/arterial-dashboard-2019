-- Table: public.ctps_cmp_2019_art_routes_ext_v1

-- DROP TABLE IF EXISTS public.ctps_cmp_2019_art_routes_ext_v1;

CREATE TABLE IF NOT EXISTS public.ctps_cmp_2019_art_routes_ext_v1
(
    objectid integer NOT NULL,
    tmc character varying(9) COLLATE pg_catalog."default",
    tmc_1 character varying(8000) COLLATE pg_catalog."default",
    rid integer,
    from_meas numeric(38,8),
    to_meas numeric(38,8),
    distance numeric(38,8),
    route_id character varying(8000) COLLATE pg_catalog."default",
    route_num character varying(8000) COLLATE pg_catalog."default",
    road_name character varying(8000) COLLATE pg_catalog."default",
    direction character varying(8000) COLLATE pg_catalog."default",
    lanes integer,
    lane_miles numeric(38,8),
    spd_limit integer,
    community character varying(8000) COLLATE pg_catalog."default",
    ffs integer,
    am_avg_sp numeric(38,8),
    am_cong_sp numeric(38,8),
    am_cong_mn numeric(38,8),
    am_del_mi numeric(38,8),
    am_delay numeric(38,8),
    am_avtt_ix numeric(38,8),
    am_5ptt_ix numeric(38,8),
    am_spd_ix numeric(38,8),
    pm_avg_sp numeric(38,8),
    pm_cong_sp numeric(38,8),
    pm_cong_mn numeric(38,8),
    pm_del_mi numeric(38,8),
    pm_delay numeric(38,8),
    pm_avtt_ix numeric(38,8),
    pm_5ptt_ix numeric(38,8),
    pm_spd_ix numeric(38,8),
    am_lottr numeric(38,8),
    pm_lottr numeric(38,8),
    gdb_geomattr_data bytea,
    shape geometry,
    CONSTRAINT enforce_srid_shape CHECK (st_srid(shape) = 26986)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.ctps_cmp_2019_art_routes_ext_v1
    OWNER to gisadmin;

-- REVOKE ALL ON TABLE public.ctps_cmp_2019_art_routes_ext_v1 FROM sde;

GRANT SELECT ON TABLE public.ctps_cmp_2019_art_routes_ext_v1 TO gispublisher;

GRANT ALL ON TABLE public.ctps_cmp_2019_art_routes_ext_v1 TO gisadmin;

GRANT SELECT ON TABLE public.ctps_cmp_2019_art_routes_ext_v1 TO gispublisher;
-- Index: a1835_ix1

-- DROP INDEX IF EXISTS mpodata.a1835_ix1;

CREATE INDEX IF NOT EXISTS a1835_ix1
    ON public.ctps_cmp_2019_art_routes_ext_v1 USING gist
    (shape)
    TABLESPACE pg_default;
-- Index: r2096_sde_rowid_uk

-- DROP INDEX IF EXISTS mpodata.r2096_sde_rowid_uk;

CREATE UNIQUE INDEX IF NOT EXISTS r2096_sde_rowid_uk
    ON public.ctps_cmp_2019_art_routes_ext_v1 USING btree
    (objectid ASC NULLS LAST)
    WITH (FILLFACTOR=75)
    TABLESPACE pg_default;