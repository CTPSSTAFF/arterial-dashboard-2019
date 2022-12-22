/**
 * Object with array of routes supported by this application, 
 * and property to record the index of the currently selected route.
 * If the latter is 0, no route is selected.
 * This data previously resided in ctpssde:MPODATA.CTPS_CMP_2014_ART_ROUTE_LIST.
 *
 * Call "oRoutes" in js script to use.
 *
 *  - EKE 6/8/17
 *
 */

(function() {

	return CMP_Arterial_Routes = {
	
		oRoutes : {
			curRouteIx : 0,
			aRouteList : [
			  {
				"ROUTE": "Beacon Street Eastbound",
				"DIRECTION": "EB",
				"RID": 101,
				"ROUTE_NUM": 1,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Beacon Street Westbound",
				"DIRECTION": "WB",
				"RID": 102,
				"ROUTE_NUM": 1,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Boylston Street Eastbound",
				"DIRECTION": "EB",
				"RID": 215,
				"ROUTE_NUM": 2,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Brookline Ave. Northbound",
				"DIRECTION": "NB",
				"RID": 213,
				"ROUTE_NUM": 3,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Brookline Ave. Southbound",
				"DIRECTION": "SB",
				"RID": 214,
				"ROUTE_NUM": 3,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Dorchester Ave./Randolph St. Northbound",
				"DIRECTION": "NB",
				"RID": 221,
				"ROUTE_NUM": 4,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Dorchester Ave./Randolph St. Southbound",
				"DIRECTION": "SB",
				"RID": 222,
				"ROUTE_NUM": 4,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Main Streets Northbound",
				"DIRECTION": "NB",
				"RID": 103,
				"ROUTE_NUM": 5,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Main Streets Southbound",
				"DIRECTION": "SB",
				"RID": 104,
				"ROUTE_NUM": 5,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Massachusetts Ave Eastbound",
				"DIRECTION": "EB",
				"RID": 105,
				"ROUTE_NUM": 6,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Massachusetts Ave Westbound",
				"DIRECTION": "WB",
				"RID": 106,
				"ROUTE_NUM": 6,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Melnea Cass Blvd./Mass. Ave. Eastbound",
				"DIRECTION": "EB",
				"RID": 211,
				"ROUTE_NUM": 7,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Melnea Cass Blvd./Mass. Ave. Westbound",
				"DIRECTION": "WB",
				"RID": 212,
				"ROUTE_NUM": 7,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Memorial Dr/Fresh Pond Pk Eastbound",
				"DIRECTION": "EB",
				"RID": 209,
				"ROUTE_NUM": 8,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Memorial Dr/Fresh Pond Pk Westbound",
				"DIRECTION": "WB",
				"RID": 210,
				"ROUTE_NUM": 8,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Middlesex Tpk/Lowell St Northbound",
				"DIRECTION": "NB",
				"RID": 107,
				"ROUTE_NUM": 9,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Middlesex Tpk/Lowell St Southbound",
				"DIRECTION": "SB",
				"RID": 108,
				"ROUTE_NUM": 9,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Morrissey Blvd. Northbound",
				"DIRECTION": "NB",
				"RID": 219,
				"ROUTE_NUM": 10,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Morrissey Blvd. Southbound",
				"DIRECTION": "SB",
				"RID": 220,
				"ROUTE_NUM": 10,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Riverway/Park Drive Northbound",
				"DIRECTION": "NB",
				"RID": 217,
				"ROUTE_NUM": 11,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Riverway/Park Drive Southbound",
				"DIRECTION": "SB",
				"RID": 218,
				"ROUTE_NUM": 11,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 107 Northbound",
				"DIRECTION": "NB",
				"RID": 109,
				"ROUTE_NUM": 12,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 107 Southbound",
				"DIRECTION": "SB",
				"RID": 110,
				"ROUTE_NUM": 12,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 109 Eastbound",
				"DIRECTION": "EB",
				"RID": 111,
				"ROUTE_NUM": 13,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 109 Westbound",
				"DIRECTION": "WB",
				"RID": 112,
				"ROUTE_NUM": 13,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 114 Eastbound",
				"DIRECTION": "EB",
				"RID": 113,
				"ROUTE_NUM": 14,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 114 Westbound",
				"DIRECTION": "WB",
				"RID": 114,
				"ROUTE_NUM": 14,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 115 Northbound",
				"DIRECTION": "NB",
				"RID": 115,
				"ROUTE_NUM": 15,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 115 Southbound",
				"DIRECTION": "SB",
				"RID": 116,
				"ROUTE_NUM": 15,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 117 Eastbound",
				"DIRECTION": "EB",
				"RID": 117,
				"ROUTE_NUM": 16,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 117 Westbound",
				"DIRECTION": "WB",
				"RID": 118,
				"ROUTE_NUM": 16,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 119 Eastbound",
				"DIRECTION": "EB",
				"RID": 119,
				"ROUTE_NUM": 17,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 119 Westbound",
				"DIRECTION": "WB",
				"RID": 120,
				"ROUTE_NUM": 17,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 123 Eastbound",
				"DIRECTION": "EB",
				"RID": 121,
				"ROUTE_NUM": 18,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 123 Westbound",
				"DIRECTION": "WB",
				"RID": 122,
				"ROUTE_NUM": 18,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 126 Northbound",
				"DIRECTION": "NB",
				"RID": 123,
				"ROUTE_NUM": 19,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 126 Southbound",
				"DIRECTION": "SB",
				"RID": 124,
				"ROUTE_NUM": 19,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 135 Eastbound",
				"DIRECTION": "EB",
				"RID": 127,
				"ROUTE_NUM": 20,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 135 Westbound",
				"DIRECTION": "WB",
				"RID": 128,
				"ROUTE_NUM": 20,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 138 Northbound",
				"DIRECTION": "NB",
				"RID": 129,
				"ROUTE_NUM": 21,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 138 Southbound",
				"DIRECTION": "SB",
				"RID": 130,
				"ROUTE_NUM": 21,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 139 East Eastbound",
				"DIRECTION": "EB",
				"RID": 131,
				"ROUTE_NUM": 22,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 139 East Westbound",
				"DIRECTION": "WB",
				"RID": 132,
				"ROUTE_NUM": 22,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 139 Eastbound",
				"DIRECTION": "EB",
				"RID": 133,
				"ROUTE_NUM": 23,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 139 Westbound",
				"DIRECTION": "WB",
				"RID": 134,
				"ROUTE_NUM": 23,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  /*********************************************************
			  * Per Ryan Hicks (December 21, 2022):
			  * Do not include Route 14 in the CMP; it lies outside the MPO.
			  {
				"ROUTE": "Route 14 Eastbound",
				"DIRECTION": "EB",
				"RID": 135,
				"ROUTE_NUM": 24,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 14 Westbound",
				"DIRECTION": "WB",
				"RID": 136,
				"ROUTE_NUM": 24,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  *********************************************************/
			  {
				"ROUTE": "Route 140 Eastbound",
				"DIRECTION": "EB",
				"RID": 137,
				"ROUTE_NUM": 25,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 140 Westbound",
				"DIRECTION": "WB",
				"RID": 138,
				"ROUTE_NUM": 25,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 16 East Eastbound",
				"DIRECTION": "EB",
				"RID": 139,
				"ROUTE_NUM": 26,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 16 East Westbound",
				"DIRECTION": "WB",
				"RID": 140,
				"ROUTE_NUM": 26,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 16 West Eastbound",
				"DIRECTION": "EB",
				"RID": 141,
				"ROUTE_NUM": 27,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 16 West Westbound",
				"DIRECTION": "WB",
				"RID": 142,
				"ROUTE_NUM": 27,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 18 Northbound",
				"DIRECTION": "NB",
				"RID": 143,
				"ROUTE_NUM": 28,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 18 Southbound",
				"DIRECTION": "SB",
				"RID": 144,
				"ROUTE_NUM": 28,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 1A between I-93 and I-90 Northbound",
				"DIRECTION": "NB",
				"RID": 223,
				"ROUTE_NUM": 29,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 1A between I-93 and I-90 Southbound",
				"DIRECTION": "SB",
				"RID": 224,
				"ROUTE_NUM": 29,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 1A Far North Northbound",
				"DIRECTION": "NB",
				"RID": 145,
				"ROUTE_NUM": 30,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 1A Far North Southbound",
				"DIRECTION": "SB",
				"RID": 146,
				"ROUTE_NUM": 30,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 1A North Northbound",
				"DIRECTION": "NB",
				"RID": 147,
				"ROUTE_NUM": 31,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 1A North Southbound",
				"DIRECTION": "SB",
				"RID": 148,
				"ROUTE_NUM": 31,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 1A South Northbound",
				"DIRECTION": "NB",
				"RID": 149,
				"ROUTE_NUM": 32,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 1A South Southbound",
				"DIRECTION": "SB",
				"RID": 150,
				"ROUTE_NUM": 32,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 20 Eastbound",
				"DIRECTION": "EB",
				"RID": 151,
				"ROUTE_NUM": 33,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 20 Westbound",
				"DIRECTION": "WB",
				"RID": 152,
				"ROUTE_NUM": 33,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 203 Eastbound",
				"DIRECTION": "EB",
				"RID": 153,
				"ROUTE_NUM": 34,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 203 Westbound",
				"DIRECTION": "WB",
				"RID": 154,
				"ROUTE_NUM": 34,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 228 Northbound",
				"DIRECTION": "NB",
				"RID": 155,
				"ROUTE_NUM": 35,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 228 Southbound",
				"DIRECTION": "SB",
				"RID": 156,
				"ROUTE_NUM": 35,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 27 Northbound",
				"DIRECTION": "NB",
				"RID": 157,
				"ROUTE_NUM": 36,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 27 Southbound",
				"DIRECTION": "SB",
				"RID": 158,
				"ROUTE_NUM": 36,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 28 North Northbound",
				"DIRECTION": "NB",
				"RID": 159,
				"ROUTE_NUM": 37,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 28 North Southbound",
				"DIRECTION": "SB",
				"RID": 160,
				"ROUTE_NUM": 37,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 28 South Northbound",
				"DIRECTION": "NB",
				"RID": 161,
				"ROUTE_NUM": 38,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 28 South Southbound",
				"DIRECTION": "SB",
				"RID": 162,
				"ROUTE_NUM": 38,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 2A East Eastbound",
				"DIRECTION": "EB",
				"RID": 163,
				"ROUTE_NUM": 39,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 2A East Westbound",
				"DIRECTION": "WB",
				"RID": 164,
				"ROUTE_NUM": 39,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 2A West Eastbound",
				"DIRECTION": "EB",
				"RID": 165,
				"ROUTE_NUM": 40,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 2A West Westbound",
				"DIRECTION": "WB",
				"RID": 166,
				"ROUTE_NUM": 40,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 30 East Eastbound",
				"DIRECTION": "EB",
				"RID": 167,
				"ROUTE_NUM": 41,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 30 East Westbound",
				"DIRECTION": "WB",
				"RID": 168,
				"ROUTE_NUM": 41,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 30 West Eastbound",
				"DIRECTION": "EB",
				"RID": 169,
				"ROUTE_NUM": 42,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 30 West Westbound",
				"DIRECTION": "WB",
				"RID": 170,
				"ROUTE_NUM": 42,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 37 Northbound",
				"DIRECTION": "NB",
				"RID": 171,
				"ROUTE_NUM": 43,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 37 Southbound",
				"DIRECTION": "SB",
				"RID": 172,
				"ROUTE_NUM": 43,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 38 Northbound",
				"DIRECTION": "NB",
				"RID": 173,
				"ROUTE_NUM": 44,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 38 Southbound",
				"DIRECTION": "SB",
				"RID": 174,
				"ROUTE_NUM": 44,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 3A South Northbound",
				"DIRECTION": "NB",
				"RID": 175,
				"ROUTE_NUM": 45,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 3A South Southbound",
				"DIRECTION": "SB",
				"RID": 176,
				"ROUTE_NUM": 45,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 4 and 225 Northbound",
				"DIRECTION": "NB",
				"RID": 177,
				"ROUTE_NUM": 46,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 4 and 225 Southbound",
				"DIRECTION": "SB",
				"RID": 178,
				"ROUTE_NUM": 46,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  /*********************************************************
			  * There is no data for "Route 4" separate from that
			  * for "Route 4 and 255."
			  {
				"ROUTE": "Route 4 Northbound",
				"DIRECTION": "NB",
				"RID": 179,
				"ROUTE_NUM": 47,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 4 Southbound",
				"DIRECTION": "SB",
				"RID": 180,
				"ROUTE_NUM": 47,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  **********************************************************/
			  {
				"ROUTE": "Route 53 Northbound",
				"DIRECTION": "NB",
				"RID": 181,
				"ROUTE_NUM": 48,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 53 Southbound",
				"DIRECTION": "SB",
				"RID": 182,
				"ROUTE_NUM": 48,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 60 Eastbound",
				"DIRECTION": "EB",
				"RID": 183,
				"ROUTE_NUM": 49,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 60 Westbound",
				"DIRECTION": "WB",
				"RID": 184,
				"ROUTE_NUM": 49,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 62 East Eastbound",
				"DIRECTION": "EB",
				"RID": 185,
				"ROUTE_NUM": 50,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 62 East Westbound",
				"DIRECTION": "WB",
				"RID": 186,
				"ROUTE_NUM": 50,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 62 West Eastbound",
				"DIRECTION": "EB",
				"RID": 187,
				"ROUTE_NUM": 51,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 62 West Westbound",
				"DIRECTION": "WB",
				"RID": 188,
				"ROUTE_NUM": 51,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 85 Northbound",
				"DIRECTION": "NB",
				"RID": 189,
				"ROUTE_NUM": 52,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 85 Southbound",
				"DIRECTION": "SB",
				"RID": 190,
				"ROUTE_NUM": 52,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 9 East Eastbound",
				"DIRECTION": "EB",
				"RID": 191,
				"ROUTE_NUM": 53,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 9 East Westbound",
				"DIRECTION": "WB",
				"RID": 192,
				"ROUTE_NUM": 53,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 9 West Eastbound",
				"DIRECTION": "EB",
				"RID": 193,
				"ROUTE_NUM": 54,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 9 West Westbound",
				"DIRECTION": "WB",
				"RID": 194,
				"ROUTE_NUM": 54,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 99 Northbound",
				"DIRECTION": "NB",
				"RID": 195,
				"ROUTE_NUM": 55,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Route 99 Southbound",
				"DIRECTION": "SB",
				"RID": 196,
				"ROUTE_NUM": 55,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Routes 129 and 129A Eastbound",
				"DIRECTION": "EB",
				"RID": 125,
				"ROUTE_NUM": 56,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Routes 129 and 129A Westbound",
				"DIRECTION": "WB",
				"RID": 126,
				"ROUTE_NUM": 56,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Storrow Dr/Soldiers Field Rd Eastbound",
				"DIRECTION": "EB",
				"RID": 207,
				"ROUTE_NUM": 57,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Storrow Dr/Soldiers Field Rd Westbound",
				"DIRECTION": "WB",
				"RID": 208,
				"ROUTE_NUM": 57,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "US Route 1 Far North Northbound",
				"DIRECTION": "NB",
				"RID": 197,
				"ROUTE_NUM": 58,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "US Route 1 Far North Southbound",
				"DIRECTION": "SB",
				"RID": 198,
				"ROUTE_NUM": 58,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "US Route 1 South Northbound",
				"DIRECTION": "NB",
				"RID": 199,
				"ROUTE_NUM": 59,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "US Route 1 South Southbound",
				"DIRECTION": "SB",
				"RID": 200,
				"ROUTE_NUM": 59,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "US Routes 3 and 3A Northbound",
				"DIRECTION": "NB",
				"RID": 201,
				"ROUTE_NUM": 60,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "US Routes 3 and 3A Southbound",
				"DIRECTION": "SB",
				"RID": 202,
				"ROUTE_NUM": 60,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "VFW Pkwy/Providence Hwy Northbound",
				"DIRECTION": "NB",
				"RID": 203,
				"ROUTE_NUM": 61,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "VFW Pkwy/Providence Hwy Southbound",
				"DIRECTION": "SB",
				"RID": 204,
				"ROUTE_NUM": 61,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Washington Street Northbound",
				"DIRECTION": "NB",
				"RID": 205,
				"ROUTE_NUM": 62,
				"CONGESTION_SCAN_DIV": "scan_none"
			  },
			  {
				"ROUTE": "Washington Street Southbound",
				"DIRECTION": "SB",
				"RID": 206,
				"ROUTE_NUM": 62,
				"CONGESTION_SCAN_DIV": "scan_none"
			  }
			]
		}
		
	}
	
})();