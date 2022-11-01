<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

	<NamedLayer>
		<Name>Arterial Highway PM Congested Time Symbolizer</Name>
		<UserStyle>
			<Title>Arterial Highway PM Congested Time Symbolizer</Title>
			<FeatureTypeStyle>

				<Rule>
					<Name>PM Cong Time lt 15 minutes </Name>
					<ogc:Filter>							
							<ogc:PropertyIsLessThan>
								<ogc:PropertyName>pm_cong_mn</ogc:PropertyName>
								<ogc:Literal>15</ogc:Literal>
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
					<Name>PM Cong Time between 15 and 30 minutes </Name>
					<ogc:Filter>							
							<ogc:PropertyIsBetween>
								<ogc:PropertyName>pm_cong_mn</ogc:PropertyName>
								<ogc:LowerBoundary>
									<ogc:Literal>15</ogc:Literal>
								</ogc:LowerBoundary>
								<ogc:UpperBoundary>
									<ogc:Literal>30</ogc:Literal>
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
					<Name>PM Cong Time between 30 and 45 minutes </Name>
					<ogc:Filter>							
							<ogc:PropertyIsBetween>
								<ogc:PropertyName>pm_cong_mn</ogc:PropertyName>
								<ogc:LowerBoundary>
									<ogc:Literal>30</ogc:Literal>
								</ogc:LowerBoundary>
								<ogc:UpperBoundary>
									<ogc:Literal>45</ogc:Literal>
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
					<Name>PM Cong Time gteq 45 minutes</Name>
					<ogc:Filter>								
							<ogc:PropertyIsGreaterThanOrEqualTo>
								<ogc:PropertyName>pm_cong_mn</ogc:PropertyName>
								<ogc:Literal>45</ogc:Literal>
							</ogc:PropertyIsGreaterThanOrEqualTo>
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
