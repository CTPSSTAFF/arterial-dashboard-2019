<?xml version="1.0" encoding="iso-8859-1"?>
<StyledLayerDescriptor version="1.0.0" 
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd" 
  xmlns="http://www.opengis.net/sld" 
  xmlns:ogc="http://www.opengis.net/ogc" 
  xmlns:xlink="http://www.w3.org/1999/xlink" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	 <NamedLayer>
		<Name>Express Highway Shields</Name>
		<UserStyle>
			<Title>Express Highway Shields</Title>
			<Abstract>Express Highway Shields</Abstract>
			<FeatureTypeStyle>
			
	
				<!-- US routes: special case of "US-3 MA-3A". This needs to be symbolized as a STATE route. --> 
				<Rule>
					<Title>U.S./State Routes: US-3 MA-3A</Title>
					<Abstract>U.S./State Route Shields: US-3 MA-3A</Abstract>
					<ogc:Filter>
						<ogc:PropertyIsEqualTo>		
							<ogc:PropertyName>rte_name</ogc:PropertyName>	
							<ogc:Literal>US-3 MA-3A</ogc:Literal>
						</ogc:PropertyIsEqualTo>
					</ogc:Filter>
					<TextSymbolizer>
						<Label>	
							<ogc:Literal>3A</ogc:Literal>						
						</Label>
							<Font>                     
								<CssParameter name="font-family">Arial</CssParameter>
								<CssParameter name="font-weight">Bold</CssParameter>   
								<CssParameter name="font-size">10</CssParameter>                     
							</Font>
							<Fill>
								<CssParameter name="fill">#333333</CssParameter>      
							</Fill>                                              
							<Graphic>
								<ExternalGraphic>    
									<OnlineResource xlink:href="http://localhost:8080/geoserver/www/apps/cmp_dashboard_common/sld_images/state_square_b.gif"/>
									<Format>image/gif</Format>
								</ExternalGraphic>
								<Size>17</Size>
							</Graphic>                           
							<VendorOption name="repeat">400</VendorOption>
							<VendorOption name="spaceAround">400</VendorOption>
							<VendorOption name="group">yes</VendorOption>
							<!-- Comment on next line from Mary McShane. -->
							<!-- <VendorOption name="Priority">100000</VendorOption>  DON'T KNOW WHAT THIS DOES, NEED NEXT LINE, THOUGH -->
						<VendorOption name="conflictResolution">false</VendorOption> 					
					</TextSymbolizer>         
				</Rule>
				
				
				<!-- US routes: 1 and 2 digits --> 
				<Rule>
					<Title>US Routes: fewer than 3 digits</Title>
					<Abstract>US Route Shields: fewer than 3 digits</Abstract>
					<ogc:Filter>
						<ogc:And>
							<ogc:PropertyIsEqualTo>		
								<ogc:Function name="strSubstring">
									<ogc:PropertyName>rte_name</ogc:PropertyName>
									<ogc:Literal>0</ogc:Literal>
									<ogc:Literal>2</ogc:Literal>
								</ogc:Function>	
								<ogc:Literal>US</ogc:Literal>
							</ogc:PropertyIsEqualTo>
							<ogc:PropertyIsLessThanOrEqualTo>
								<ogc:Function name="strLength">
									<ogc:PropertyName>rte_name</ogc:PropertyName>
								</ogc:Function>				
								<ogc:Literal>5</ogc:Literal>
							</ogc:PropertyIsLessThanOrEqualTo>						
						</ogc:And>
					</ogc:Filter>		
					<TextSymbolizer>
						<Label>					
                            <ogc:Function name="strReplace">
                                <ogc:PropertyName>rte_name</ogc:PropertyName>
								<ogc:Literal>US-</ogc:Literal>
								<ogc:Literal></ogc:Literal>
                                <ogc:Literal>False</ogc:Literal>
                            </ogc:Function>						
						</Label>
							<Font>                     
								<CssParameter name="font-family">Arial</CssParameter>
								<CssParameter name="font-weight">Bold</CssParameter>   
								<CssParameter name="font-size">10</CssParameter>                     
							</Font>
							<Fill>
								<CssParameter name="fill">#333333</CssParameter>      
							</Fill>                                              
							<Graphic>
								<ExternalGraphic> 
									<OnlineResource xlink:href="http://localhost:8080/geoserver/www/apps/cmp_dashboard_common/sld_images/US3.gif"/>								
									<Format>image/gif</Format>
								</ExternalGraphic>
								<Size>17</Size>
							</Graphic>                           
							<VendorOption name="repeat">400</VendorOption>
							<VendorOption name="spaceAround">400</VendorOption>
							<VendorOption name="group">yes</VendorOption>
							<!-- Comment on next line from Mary McShane. -->
							<!-- <VendorOption name="Priority">100000</VendorOption>  DON'T KNOW WHAT THIS DOES, NEED NEXT LINE, THOUGH -->
						<VendorOption name="conflictResolution">false</VendorOption> 					
					</TextSymbolizer>         
				</Rule>					
				
				
				<!-- Massachusetts state routes: special case of MA-4/MA-225 -->
				<Rule>
					<Title>Massachusetts State Routes: MA-4/MA-224</Title>
					<Abstract>Massachusetts State Route Shields: MA-4/MA-224</Abstract>
					<ogc:Filter>
						<ogc:PropertyIsEqualTo>		
							<ogc:PropertyName>rte_name</ogc:PropertyName>	
							<ogc:Literal>MA-4/MA-225</ogc:Literal>
						</ogc:PropertyIsEqualTo>
					</ogc:Filter>		
					<TextSymbolizer>
						<Label>	
							<ogc:Literal>4</ogc:Literal>						
						</Label>
							<Font>                     
								<CssParameter name="font-family">Arial</CssParameter>
								<CssParameter name="font-weight">Bold</CssParameter>   
								<CssParameter name="font-size">10</CssParameter>                     
							</Font>
							<Fill>
								<CssParameter name="fill">#333333</CssParameter>      
							</Fill>                                              
							<Graphic>
								<ExternalGraphic>    
									<OnlineResource xlink:href="http://localhost:8080/geoserver/www/apps/cmp_dashboard_common/sld_images/state_square_b.gif"/>
									<Format>image/gif</Format>
								</ExternalGraphic>
								<Size>17</Size>
							</Graphic>                           
							<VendorOption name="repeat">400</VendorOption>
							<VendorOption name="spaceAround">400</VendorOption>
							<VendorOption name="group">yes</VendorOption>
							<!-- Comment on next line from Mary McShane. -->
							<!-- <VendorOption name="Priority">100000</VendorOption>  DON'T KNOW WHAT THIS DOES, NEED NEXT LINE, THOUGH -->
						<VendorOption name="conflictResolution">false</VendorOption> 					
					</TextSymbolizer>         
				</Rule>				
				
				<!-- Massachusetts state routes: 3 characters --> 
				<Rule>
					<Title>Massachusetts State Routes: 3 characters</Title>
					<Abstract>Massachusetts State Route Shields: 3 characters</Abstract>
					<ogc:Filter>
						<ogc:And>
							<ogc:PropertyIsEqualTo>		
								<ogc:Function name="strSubstring">
									<ogc:PropertyName>rte_name</ogc:PropertyName>
									<ogc:Literal>0</ogc:Literal>
									<ogc:Literal>2</ogc:Literal>
								</ogc:Function>	
								<ogc:Literal>MA</ogc:Literal>
							</ogc:PropertyIsEqualTo>
							<ogc:PropertyIsEqualTo>
								<ogc:Function name="strLength">
									<ogc:PropertyName>rte_name</ogc:PropertyName>
								</ogc:Function>				
								<ogc:Literal>6</ogc:Literal>
							</ogc:PropertyIsEqualTo>						
						</ogc:And>
					</ogc:Filter>
					<TextSymbolizer>
						<Label>					
                            <ogc:Function name="strReplace">
                                <ogc:PropertyName>rte_name</ogc:PropertyName>
								<ogc:Literal>MA-</ogc:Literal>
								<ogc:Literal></ogc:Literal>
                                <ogc:Literal>False</ogc:Literal>
                            </ogc:Function>						
						</Label>
							<Font>                     
								<CssParameter name="font-family">Arial</CssParameter>
								<CssParameter name="font-weight">Bold</CssParameter>   
								<CssParameter name="font-size">10</CssParameter>                     
							</Font>
							<Fill>
								<CssParameter name="fill">#333333</CssParameter>      
							</Fill>                                              
							<Graphic>
								<ExternalGraphic>                                  
									<OnlineResource xlink:href="http://localhost:8080/geoserver/www/apps/cmp_dashboard_common/sld_images/state_rectangle_b.gif"/>
									<Format>image/gif</Format>
								</ExternalGraphic>
								<Size>17</Size>
							</Graphic>                           
							<VendorOption name="repeat">400</VendorOption>
							<VendorOption name="spaceAround">400</VendorOption>
							<VendorOption name="group">yes</VendorOption>
							<!-- Comment on next line from Mary McShane. -->
							<!-- <VendorOption name="Priority">100000</VendorOption>  DON'T KNOW WHAT THIS DOES, NEED NEXT LINE, THOUGH -->
						<VendorOption name="conflictResolution">false</VendorOption> 					
					</TextSymbolizer>         
				</Rule>
				
				<!-- Massachusetts state routes: 1 or 2 digits --> 
				<Rule>
					<Title>Massachusetts State Routes: fewer than 3 characters</Title>
					<Abstract>Massachusetts State Route Shields: fewer than 3 characters</Abstract>
					<ogc:Filter>
						<ogc:And>
							<ogc:PropertyIsEqualTo>		
								<ogc:Function name="strSubstring">
									<ogc:PropertyName>rte_name</ogc:PropertyName>
									<ogc:Literal>0</ogc:Literal>
									<ogc:Literal>2</ogc:Literal>
								</ogc:Function>	
								<ogc:Literal>MA</ogc:Literal>
							</ogc:PropertyIsEqualTo>
							<ogc:PropertyIsLessThanOrEqualTo>
								<ogc:Function name="strLength">
									<ogc:PropertyName>rte_name</ogc:PropertyName>
								</ogc:Function>				
								<ogc:Literal>5</ogc:Literal>
							</ogc:PropertyIsLessThanOrEqualTo>						
						</ogc:And>
					</ogc:Filter>		
					<TextSymbolizer>
						<Label>					
                            <ogc:Function name="strReplace">
                                <ogc:PropertyName>rte_name</ogc:PropertyName>
								<ogc:Literal>MA-</ogc:Literal>
								<ogc:Literal></ogc:Literal>
                                <ogc:Literal>False</ogc:Literal>
                            </ogc:Function>						
						</Label>
							<Font>                     
								<CssParameter name="font-family">Arial</CssParameter>
								<CssParameter name="font-weight">Bold</CssParameter>   
								<CssParameter name="font-size">10</CssParameter>                     
							</Font>
							<Fill>
								<CssParameter name="fill">#333333</CssParameter>      
							</Fill>                                              
							<Graphic>
								<ExternalGraphic>                                  
									<OnlineResource xlink:href="http://localhost:8080/geoserver/www/apps/cmp_dashboard_common/sld_images/state_square_b.gif"/>
									<Format>image/gif</Format>
								</ExternalGraphic>
								<Size>17</Size>
							</Graphic>                           
							<VendorOption name="repeat">400</VendorOption>
							<VendorOption name="spaceAround">400</VendorOption>
							<VendorOption name="group">yes</VendorOption>
							<!-- Comment on next line from Mary McShane. -->
							<!-- <VendorOption name="Priority">100000</VendorOption>  DON'T KNOW WHAT THIS DOES, NEED NEXT LINE, THOUGH -->
						<VendorOption name="conflictResolution">false</VendorOption> 					
					</TextSymbolizer>         
				</Rule>				
				
			</FeatureTypeStyle>
		</UserStyle>
	</NamedLayer>
</StyledLayerDescriptor>
