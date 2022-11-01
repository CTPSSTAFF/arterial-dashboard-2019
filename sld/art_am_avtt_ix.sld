<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

	<NamedLayer>
		<Name>Arterial Highway AM Avg travel time ix Symbolizer</Name>
		<UserStyle>
			<Title>Arterial Highway AM Avg travel time ix Symbolizer</Title>
			<FeatureTypeStyle>

				<Rule>
					<Name>AM Avg travel time ix lt 1.15 </Name>
					<ogc:Filter>							
							<ogc:PropertyIsLessThan>
								<ogc:PropertyName>am_avtt_ix</ogc:PropertyName>
								<ogc:Literal>1.15</ogc:Literal>
							</ogc:PropertyIsLessThan>
					</ogc:Filter>
					<LineSymbolizer>
						<Stroke>
							<CssParameter name="stroke">#afebba</CssParameter>
							<CssParameter name="stroke-width">7</CssParameter>
                            <CssParameter name="stroke-linejoin">round</CssParameter>
                            <CssParameter name="stroke-linecap">round</CssParameter>
						</Stroke>
						<PerpendicularOffset>7</PerpendicularOffset>
					</LineSymbolizer>
				</Rule>		

				<Rule>
					<Name>AM Avg travel time ix between 1.15 and 1.29999 </Name>
					<ogc:Filter>							
							<ogc:PropertyIsBetween>
								<ogc:PropertyName>am_avtt_ix</ogc:PropertyName>
								<ogc:LowerBoundary>
									<ogc:Literal>1.15</ogc:Literal>
								</ogc:LowerBoundary>
								<ogc:UpperBoundary>
									<ogc:Literal>1.29999</ogc:Literal>
								</ogc:UpperBoundary>													
							</ogc:PropertyIsBetween>
					</ogc:Filter>
					<LineSymbolizer>
						<Stroke>
							<CssParameter name="stroke">#69a694</CssParameter>
							<CssParameter name="stroke-width">7</CssParameter>
                            <CssParameter name="stroke-linejoin">round</CssParameter>
                            <CssParameter name="stroke-linecap">round</CssParameter>
						</Stroke>
						<PerpendicularOffset>7</PerpendicularOffset>
					</LineSymbolizer>
				</Rule>	
							
				<Rule>
					<Name>AM Avg travel time ix between 1.3 and 2.0 </Name>
					<ogc:Filter>							
							<ogc:PropertyIsBetween>
								<ogc:PropertyName>am_avtt_ix</ogc:PropertyName>
								<ogc:LowerBoundary>
									<ogc:Literal>1.3</ogc:Literal>
								</ogc:LowerBoundary>
								<ogc:UpperBoundary>
									<ogc:Literal>2.0</ogc:Literal>
								</ogc:UpperBoundary>													
							</ogc:PropertyIsBetween>
					</ogc:Filter>
					<LineSymbolizer>
						<Stroke>
							<CssParameter name="stroke">#cd8aab</CssParameter>
							<CssParameter name="stroke-width">7</CssParameter>
                            <CssParameter name="stroke-linejoin">round</CssParameter>
                            <CssParameter name="stroke-linecap">round</CssParameter>
						</Stroke>
						<PerpendicularOffset>7</PerpendicularOffset>
					</LineSymbolizer>
				</Rule>						
				
							
				<Rule>
					<Name>AM Avg travel time ix gt 2.0</Name>
					<ogc:Filter>								
							<ogc:PropertyIsGreaterThan>
								<ogc:PropertyName>am_avtt_ix</ogc:PropertyName>
								<ogc:Literal>2.0</ogc:Literal>
							</ogc:PropertyIsGreaterThan>
					</ogc:Filter>
					<LineSymbolizer>
						<Stroke>
							<CssParameter name="stroke">#9900bd</CssParameter>
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
