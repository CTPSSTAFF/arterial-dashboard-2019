<?xml version="1.0" encoding="iso-8859-1"?>
<StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">
  <NamedLayer>
    <Name>Quick-drawing grouped road features</Name>
    <UserStyle>
      <Title>Road features with additional functional classes shown at larger scales</Title>
      <Abstract>Different symbols depending on functional class, route system, and access control</Abstract>
      
      <FeatureTypeStyle>
<!-- Rule 1 local roads (FC=0) close-in (5000 to 30000)  -->
        <Rule>
          <Title>Local roads medium scale</Title>
          <Abstract>A thin gray line</Abstract>
          <ogc:Filter>
			<ogc:PropertyIsEqualTo>
			  <ogc:PropertyName>functionalclassification</ogc:PropertyName>
			  <ogc:Literal>0</ogc:Literal>
			</ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>5000</MinScaleDenominator>
          <MaxScaleDenominator>30000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#bbbbbb</CssParameter>
              <CssParameter name="stroke-width">.3</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
      
      <FeatureTypeStyle>
<!--  Rule 2 other FC=0 roads and ramps slightly farther out (5000 to 120000): same style as above  -->
        <Rule>
          <Title>Other functionally classified roads and ramps medium scale</Title>
          <Abstract>A thin black line</Abstract>
          <ogc:Filter>
            <ogc:Or>
				<ogc:And>
				  <ogc:Or>
					<ogc:PropertyIsNull>
					  <ogc:PropertyName>routesystem</ogc:PropertyName>
					</ogc:PropertyIsNull>
                    <ogc:Or>
                      <ogc:PropertyIsEqualTo>
                        <ogc:PropertyName>routesystem</ogc:PropertyName>
                        <ogc:Literal>0</ogc:Literal>
                      </ogc:PropertyIsEqualTo>
                      <ogc:PropertyIsEqualTo>
                        <ogc:PropertyName>routesystem</ogc:PropertyName>
                        <ogc:Literal>N</ogc:Literal>
                      </ogc:PropertyIsEqualTo>
                    </ogc:Or>
				  </ogc:Or>
					<ogc:PropertyIsGreaterThan>
					  <ogc:PropertyName>functionalclassification</ogc:PropertyName>
					  <ogc:Literal>1</ogc:Literal>
					</ogc:PropertyIsGreaterThan>
				</ogc:And>
				<ogc:And>
				  <ogc:Or>
					<ogc:PropertyIsEqualTo>
					  <ogc:PropertyName>routesystem</ogc:PropertyName>
					  <ogc:Literal>I</ogc:Literal>
					</ogc:PropertyIsEqualTo>
					<ogc:Or>
					  <ogc:PropertyIsEqualTo>
					    <ogc:PropertyName>routesystem</ogc:PropertyName>
					    <ogc:Literal>US</ogc:Literal>
					  </ogc:PropertyIsEqualTo>
					  <ogc:PropertyIsEqualTo>
					    <ogc:PropertyName>routesystem</ogc:PropertyName>
					    <ogc:Literal>SR</ogc:Literal>
					  </ogc:PropertyIsEqualTo>
					</ogc:Or>
				  </ogc:Or>
				  <ogc:Not>
					<ogc:Or>
					  <ogc:PropertyIsEqualTo>
						<ogc:PropertyName>facilitytype</ogc:PropertyName>
						<ogc:Literal>1</ogc:Literal>
					  </ogc:PropertyIsEqualTo>
					  <ogc:Or>
						<ogc:PropertyIsEqualTo>
						  <ogc:PropertyName>facilitytype</ogc:PropertyName>
						  <ogc:Literal>3</ogc:Literal>
						</ogc:PropertyIsEqualTo>
						<ogc:PropertyIsEqualTo>
						  <ogc:PropertyName>facilitytype</ogc:PropertyName>
						  <ogc:Literal>4</ogc:Literal>
						</ogc:PropertyIsEqualTo>
					  </ogc:Or>
					</ogc:Or>
				  </ogc:Not>
				</ogc:And>
            </ogc:Or>
          </ogc:Filter>
          <MinScaleDenominator>5000</MinScaleDenominator>
          <MaxScaleDenominator>120000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#bbbbbb</CssParameter>
              <CssParameter name="stroke-width">0.3</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
      
      <FeatureTypeStyle>
<!--   Rule 3 same scale as 2 for State Routes (5000 to 150000): thicker lines    -->
        <Rule>
          <Title>State routes</Title>
          <Abstract>A thick black line</Abstract>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>routesystem</ogc:PropertyName>
              <ogc:Literal>SR</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>5000</MinScaleDenominator>
          <MaxScaleDenominator>150000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#bbbbbb</CssParameter>
              <CssParameter name="stroke-width">0.8</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
      
      <FeatureTypeStyle>
<!--   Rule 4 Fed routes at all scales 5000 to 150000 lighter but thicker than Rule 1    -->
        <Rule>
          <Title>Federal routes small scale</Title>
          <Abstract>A thick gray line</Abstract>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>routesystem</ogc:PropertyName>
              <ogc:Literal>US</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>5000</MinScaleDenominator>
          <MaxScaleDenominator>150000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#c2c2c2</CssParameter>
              <CssParameter name="stroke-width">.5</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
      
      <FeatureTypeStyle>
<!--  Rule 5 uncontrolled access Fed routes only at 5000 to 120000    -->
        <Rule>
          <Title>Unlimited access federal routes medium scale</Title>
          <Abstract>A thick gray line</Abstract>
          <ogc:Filter>
            <ogc:And>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>routesystem</ogc:PropertyName>
                <ogc:Literal>US</ogc:Literal>
              </ogc:PropertyIsEqualTo>
              <ogc:And>
                <ogc:PropertyIsNotEqualTo>
                  <ogc:PropertyName>accesscontrol</ogc:PropertyName>
                  <ogc:Literal>1</ogc:Literal>
                </ogc:PropertyIsNotEqualTo>
                <ogc:Or>
                  <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>facilitytype</ogc:PropertyName>
                    <ogc:Literal>1</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                  <ogc:Or>
                    <ogc:PropertyIsEqualTo>
                      <ogc:PropertyName>facilitytype</ogc:PropertyName>
                      <ogc:Literal>3</ogc:Literal>
                    </ogc:PropertyIsEqualTo>
                    <ogc:PropertyIsEqualTo>
                      <ogc:PropertyName>facilitytype</ogc:PropertyName>
                      <ogc:Literal>4</ogc:Literal>
                    </ogc:PropertyIsEqualTo>
                  </ogc:Or>
                </ogc:Or>
              </ogc:And>
            </ogc:And>
          </ogc:Filter>
          <MinScaleDenominator>5000</MinScaleDenominator>
          <MaxScaleDenominator>120000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#acacac</CssParameter>
              <CssParameter name="stroke-width">.5</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
      
      <FeatureTypeStyle>
<!--  NOTE: Rules 6, 7 and 8 apply to same roads  -->
<!--  Rule 6 non-Interstate limited-access (5000 to 150000) gray, thick line  -->
        <Rule>
          <Title>Non-interstate limited access roads</Title>
          <Abstract>Base stroke for non-interstate limited access roads</Abstract>
          <ogc:Filter>
            <ogc:And>
              <ogc:PropertyIsNotEqualTo>
                <ogc:PropertyName>routesystem</ogc:PropertyName>
                <ogc:Literal>I</ogc:Literal>
              </ogc:PropertyIsNotEqualTo>
              <ogc:And>
                <ogc:PropertyIsEqualTo>
                  <ogc:PropertyName>accesscontrol</ogc:PropertyName>
                  <ogc:Literal>1</ogc:Literal>
                </ogc:PropertyIsEqualTo>
                <ogc:Or>
                  <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>facilitytype</ogc:PropertyName>
                    <ogc:Literal>1</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                  <ogc:Or>
                    <ogc:PropertyIsEqualTo>
                      <ogc:PropertyName>facilitytype</ogc:PropertyName>
                      <ogc:Literal>3</ogc:Literal>
                    </ogc:PropertyIsEqualTo>
                    <ogc:PropertyIsEqualTo>
                      <ogc:PropertyName>facilitytype</ogc:PropertyName>
                      <ogc:Literal>4</ogc:Literal>
                    </ogc:PropertyIsEqualTo>
                  </ogc:Or>
                </ogc:Or>
              </ogc:And>
            </ogc:And>
          </ogc:Filter>
          <MinScaleDenominator>5000</MinScaleDenominator>
          <MaxScaleDenominator>150000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#bbbbbb</CssParameter>
              <CssParameter name="stroke-width">1</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
      
      <FeatureTypeStyle>
<!--  Rule 7 applies to same roads as Rule 6 at same scales -->
        <Rule>
          <Title>Non-interstate limited access roads fill</Title>
          <Abstract>Fill stroke for non-interstate limited access roads</Abstract>
          <ogc:Filter>
            <ogc:And>
              <ogc:PropertyIsNotEqualTo>
                <ogc:PropertyName>routesystem</ogc:PropertyName>
                <ogc:Literal>I</ogc:Literal>
              </ogc:PropertyIsNotEqualTo>
              <ogc:And>
                <ogc:PropertyIsEqualTo>
                  <ogc:PropertyName>accesscontrol</ogc:PropertyName>
                  <ogc:Literal>1</ogc:Literal>
                </ogc:PropertyIsEqualTo>
                <ogc:Or>
                  <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>facilitytype</ogc:PropertyName>
                    <ogc:Literal>1</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                  <ogc:Or>
                    <ogc:PropertyIsEqualTo>
                      <ogc:PropertyName>facilitytype</ogc:PropertyName>
                      <ogc:Literal>3</ogc:Literal>
                    </ogc:PropertyIsEqualTo>
                    <ogc:PropertyIsEqualTo>
                      <ogc:PropertyName>facilitytype</ogc:PropertyName>
                      <ogc:Literal>4</ogc:Literal>
                    </ogc:PropertyIsEqualTo>
                  </ogc:Or>
                </ogc:Or>
              </ogc:And>
            </ogc:And>
          </ogc:Filter>
          <MinScaleDenominator>5000</MinScaleDenominator>
          <MaxScaleDenominator>150000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#c2c2c2</CssParameter>
              <CssParameter name="stroke-width">1</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
      
      <FeatureTypeStyle>
<!--  Rule 8 applies to same roads as Rule 6 and 7 at same scales -->
        <Rule>
          <Title>Non-interstate limited access roads center line</Title>
          <Abstract>Center stroke for non-interstate limited access roads</Abstract>
          <ogc:Filter>
            <ogc:And>
              <ogc:PropertyIsNotEqualTo>
                <ogc:PropertyName>routesystem</ogc:PropertyName>
                <ogc:Literal>I</ogc:Literal>
              </ogc:PropertyIsNotEqualTo>
              <ogc:And>
                <ogc:PropertyIsEqualTo>
                  <ogc:PropertyName>accesscontrol</ogc:PropertyName>
                  <ogc:Literal>1</ogc:Literal>
                </ogc:PropertyIsEqualTo>
                <ogc:Or>
                  <ogc:PropertyIsEqualTo>
                    <ogc:PropertyName>facilitytype</ogc:PropertyName>
                    <ogc:Literal>1</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
                  <ogc:Or>
                    <ogc:PropertyIsEqualTo>
                      <ogc:PropertyName>facilitytype</ogc:PropertyName>
                      <ogc:Literal>3</ogc:Literal>
                    </ogc:PropertyIsEqualTo>
                    <ogc:PropertyIsEqualTo>
                      <ogc:PropertyName>facilitytype</ogc:PropertyName>
                      <ogc:Literal>4</ogc:Literal>
                    </ogc:PropertyIsEqualTo>
                  </ogc:Or>
                </ogc:Or>
              </ogc:And>
            </ogc:And>
          </ogc:Filter>
          <MinScaleDenominator>5000</MinScaleDenominator>
          <MaxScaleDenominator>150000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#acacac</CssParameter>
              <CssParameter name="stroke-width">1</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
      
      <FeatureTypeStyle>
<!--  Rule 9 Interstates at scale 50000 and above: thick gray line -->
        <Rule>
          <Title>Interstates small-scale (base stroke)</Title>
          <Abstract>The base stroke for interstates</Abstract>
          <ogc:Filter>
          <ogc:And>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>routesystem</ogc:PropertyName>
              <ogc:Literal>I</ogc:Literal>
            </ogc:PropertyIsEqualTo>
            <ogc:Or>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>routedirection</ogc:PropertyName>
              <ogc:Literal>NB</ogc:Literal>
            </ogc:PropertyIsEqualTo>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>routedirection</ogc:PropertyName>
              <ogc:Literal>EB</ogc:Literal>
            </ogc:PropertyIsEqualTo>
            </ogc:Or>
            </ogc:And>
          </ogc:Filter>
          <MinScaleDenominator>50000</MinScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#bbbbbb</CssParameter>
              <CssParameter name="stroke-width">1</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
      
      <FeatureTypeStyle>
<!--   Rule 10 Interstates same scale thicker line  -->
        <Rule>
          <Title>Interstates small-scale (fill stroke)</Title>
          <Abstract>Fill stroke for interstates</Abstract>
          <ogc:Filter>
            <ogc:And>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>routesystem</ogc:PropertyName>
              <ogc:Literal>I</ogc:Literal>
            </ogc:PropertyIsEqualTo>
            <ogc:Or>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>routedirection</ogc:PropertyName>
              <ogc:Literal>NB</ogc:Literal>
            </ogc:PropertyIsEqualTo>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>routedirection</ogc:PropertyName>
              <ogc:Literal>EB</ogc:Literal>
            </ogc:PropertyIsEqualTo>
            </ogc:Or>
            </ogc:And>
          </ogc:Filter>
          <MinScaleDenominator>50000</MinScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#c2c2c2</CssParameter>
              <CssParameter name="stroke-width">1.2</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
      
      <FeatureTypeStyle>
<!--  Rule 11 Interstates same scale centerline   -->
        <Rule>
          <Title>Interstates small-scale (center stroke)</Title>
          <Abstract>Centerline of interstate symbol</Abstract>
          <ogc:Filter>
            <ogc:And>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>routesystem</ogc:PropertyName>
              <ogc:Literal>I</ogc:Literal>
            </ogc:PropertyIsEqualTo>
            <ogc:Or>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>routedirection</ogc:PropertyName>
              <ogc:Literal>NB</ogc:Literal>
            </ogc:PropertyIsEqualTo>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>routedirection</ogc:PropertyName>
              <ogc:Literal>EB</ogc:Literal>
            </ogc:PropertyIsEqualTo>
            </ogc:Or>
            </ogc:And>
          </ogc:Filter>
          <MinScaleDenominator>50000</MinScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#bbbbbb</CssParameter>
              <CssParameter name="stroke-width">1</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>

      <FeatureTypeStyle>
<!--  Rule 12 Interstates smaller scale (5000 to 500000) -->
        <Rule>
          <Title>Interstates mid-scale (base stroke)</Title>
          <Abstract>The base stroke for interstates</Abstract>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>routesystem</ogc:PropertyName>
              <ogc:Literal>I</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>5000</MinScaleDenominator>
          <MaxScaleDenominator>500000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#bbbbbb</CssParameter>
              <CssParameter name="stroke-width">1</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
      
      <FeatureTypeStyle>
<!--  Rule 13  Interstates smaller scale (5000 to 500000) -->
        <Rule>
          <Title>Interstates mid-scale (fill stroke)</Title>
          <Abstract>Fill stroke for interstates</Abstract>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>routesystem</ogc:PropertyName>
              <ogc:Literal>I</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>5000</MinScaleDenominator>
          <MaxScaleDenominator>500000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#c2c2c2</CssParameter>
              <CssParameter name="stroke-width">1</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
      
      <FeatureTypeStyle>
<!--  Rule 14  Interstates smaller scale (5000 to 500000) -->
        <Rule>
          <Title>Interstates mid-scale (center stroke)</Title>
          <Abstract>Centerline of interstate symbol</Abstract>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>routesystem</ogc:PropertyName>
              <ogc:Literal>I</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>5000</MinScaleDenominator>
          <MaxScaleDenominator>500000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#bbbbbb</CssParameter>
              <CssParameter name="stroke-width">1</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
