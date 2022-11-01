<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

	<NamedLayer>
		<Name>Arterial Highway AM Speed Index Symbolizer</Name>
		<UserStyle>
			<Title>Arterial Highway AM Speed Index Symbolizer</Title>
			<FeatureTypeStyle>

				<Rule>
					<Name>AM Speed Index lt 0.4 </Name>
					<ogc:Filter>							
							<ogc:PropertyIsLessThan>
								<ogc:PropertyName>am_spd_ix</ogc:PropertyName>
								<ogc:Literal>0.4</ogc:Literal>
							</ogc:PropertyIsLessThan>
					</ogc:Filter>
					<LineSymbolizer>
						<Stroke>
							<CssParameter name="stroke">#e600a9</CssParameter>
							<CssParameter name="stroke-width">7</CssParameter>
                            <CssParameter name="stroke-linejoin">round</CssParameter>
                            <CssParameter name="stroke-linecap">round</CssParameter>
						</Stroke>
						<PerpendicularOffset>7</PerpendicularOffset>
					</LineSymbolizer>
				</Rule>		

				<Rule>
					<Name>AM Speed Index between 0.4 and 0.4999 </Name>
					<ogc:Filter>							
							<ogc:PropertyIsBetween>
								<ogc:PropertyName>am_spd_ix</ogc:PropertyName>
								<ogc:LowerBoundary>
									<ogc:Literal>0.4</ogc:Literal>
								</ogc:LowerBoundary>
								<ogc:UpperBoundary>
									<ogc:Literal>0.4999</ogc:Literal>
								</ogc:UpperBoundary>													
							</ogc:PropertyIsBetween>
					</ogc:Filter>
					<LineSymbolizer>
						<Stroke>
							<CssParameter name="stroke">#a900e6</CssParameter>
							<CssParameter name="stroke-width">7</CssParameter>
                            <CssParameter name="stroke-linejoin">round</CssParameter>
                            <CssParameter name="stroke-linecap">round</CssParameter>
						</Stroke>
						<PerpendicularOffset>7</PerpendicularOffset>
					</LineSymbolizer>
				</Rule>	
							
				<Rule>
					<Name>AM Speed Index between 0.5 an 0.6999 </Name>
					<ogc:Filter>							
							<ogc:PropertyIsBetween>
								<ogc:PropertyName>am_spd_ix</ogc:PropertyName>
								<ogc:LowerBoundary>
									<ogc:Literal>0.5</ogc:Literal>
								</ogc:LowerBoundary>
								<ogc:UpperBoundary>
									<ogc:Literal>0.6999</ogc:Literal>
								</ogc:UpperBoundary>													
							</ogc:PropertyIsBetween>
					</ogc:Filter>
					<LineSymbolizer>
						<Stroke>
							<CssParameter name="stroke">#0070ff</CssParameter>
							<CssParameter name="stroke-width">7</CssParameter>
                            <CssParameter name="stroke-linejoin">round</CssParameter>
                            <CssParameter name="stroke-linecap">round</CssParameter>
						</Stroke>
						<PerpendicularOffset>7</PerpendicularOffset>
					</LineSymbolizer>
				</Rule>	
				
				<Rule>
					<Name>AM Speed Index between 0.7 an 0.9 </Name>
					<ogc:Filter>							
							<ogc:PropertyIsBetween>
								<ogc:PropertyName>am_spd_ix</ogc:PropertyName>
								<ogc:LowerBoundary>
									<ogc:Literal>0.7</ogc:Literal>
								</ogc:LowerBoundary>
								<ogc:UpperBoundary>
									<ogc:Literal>0.9</ogc:Literal>
								</ogc:UpperBoundary>													
							</ogc:PropertyIsBetween>
					</ogc:Filter>
					<LineSymbolizer>
						<Stroke>
							<CssParameter name="stroke">#73b2ff</CssParameter>
							<CssParameter name="stroke-width">7</CssParameter>
                            <CssParameter name="stroke-linejoin">round</CssParameter>
                            <CssParameter name="stroke-linecap">round</CssParameter>
						</Stroke>
						<PerpendicularOffset>7</PerpendicularOffset>
					</LineSymbolizer>
				</Rule>					
				
							
				<Rule>
					<Name>AM Speed Index gt 0.9</Name>
					<ogc:Filter>								
							<ogc:PropertyIsGreaterThan>
								<ogc:PropertyName>am_spd_ix</ogc:PropertyName>
								<ogc:Literal>0.9</ogc:Literal>
							</ogc:PropertyIsGreaterThan>
					</ogc:Filter>
					<LineSymbolizer>
						<Stroke>
							<CssParameter name="stroke">#bed2ff</CssParameter>
							<CssParameter name="stroke-width">7</CssParameter>
                            <CssParameter name="stroke-linejoin">round</CssParameter>
                            <CssParameter name="stroke-linecap">round</CssParameter>
						</Stroke>
						<PerpendicularOffset>7</PerpendicularOffset>
					</LineSymbolizer>
				</Rule>
				
			</FeatureTypeStyle>
		</UserStyle>
	</NamedLayer>
</StyledLayerDescriptor>
