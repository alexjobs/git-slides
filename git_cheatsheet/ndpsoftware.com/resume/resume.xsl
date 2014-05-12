<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet xmlns:xsl='http://www.w3.org/1999/XSL/Transform' version='1.1'>

	<!-- 
	Copyright (c) 2004 Andrew J. Peterson
	All Rights Reserved.
	This software may be used for education purposes only. Any commercial use requires
	written permission of the author.
	-->
	<xsl:output method="html" indent="no" encoding="US-ASCII" doctype-public="-//W3C//DTD HTML 4.01//EN" doctype-system="http://www.w3.org/TR/html401/strict.dtd" />
	<xsl:strip-space elements="name company title" />

<!-- languagesPlacement, toolsPlacement, technologiesPlacement: [ withJob | withProject | header | footer | none ] -->
	<xsl:param name="languagesPlacement" select="'withProject'" />
	<xsl:param name="toolsPlacement" select="'withProject'" />
	<xsl:param name="technologiesPlacement" select="'withProject'" />
<!-- clientPlacement: [ withJob | withProject | section | none ] -->
	<xsl:param name="clientPlacement" select="'withProject'" />
<!-- goal: engineer | manager -->
	<xsl:param name="goal" select="'engineer'" />
	<xsl:param name="featuredSkills" select="''" />
	<xsl:template match="/resume">
		
	<html>
		<head>
			<title></title> <style type="text/css">

 	&lt;!--
				body
				{
				color: #111;
				background-color: #FFF;
				margin-left: .6in;
				margin-right: .6in;
				margin-top: .6in;
				margin-bottom: .6in;
				font-family: Georgia, Times, Times New Roman, serif;
				}
				
				
				h1, h2, h3, h4, h5, h6 { font-family: Verdana,Arial,Helvetica,sans-serif; }
				p { margin: 6px 0 4px 0; }
				h1, h2, h3, h4, h5, h6 { text-align: left; }
				
				.job {
				margin-bottom: 0;
				margin-top: 10px;
				}
				
				.job .date {
				font-weight: bold;
				display: block;
				}
				.job .title , .job .company {
				font-weight: bold;
				}
				
				.job .company-description {
				display: block;
				}
				.company-description {
				font-style: italic;
				}
				
				.role {
				margin-top: 10px;
				margin-left: 30px;
				margin-right: 30px;
				}
				
				.role .title {
				font-weight: bold;
				}
				.role .description {
				margin-top: 0px;
				font-weight: normal;
				}
				
				.project {
				margin-top: 10px;
				margin-left: 30px;
				margin-right: 30px;
				font-size:100%;
				}
				.project .date {
				text-style: italic;
				display: block;
				}
				.project .title {
				text-style: italic;
				}
				.project .company {
				text-style: italic;
				}
				.project .description {
				margin-top: 0;
				display: block;
				}
				
				h3 	
				{
				background-color: #aac; /* CCC */
				height: 18pt;
				font-size: 110%;
				text-align: left;
				padding: 0 0 0 4pt;
				width: 2.5in;
				font-variant: small-caps;
				border-left: #339; /*  black */
				border-width: 0 0 0 18pt;
				border-style: solid;
				}
				h4.company
				{
				text-align: left;
				margin: 14px 0 0 0;
				}
				a, a:link, a:visited
				{
				text-decoration: none;
				color: #306;
				}
				
				a:active { color: #fc7; }
				
				td { vertical-align: top; }
				
				span.list { display: block; }
				span.listLabel { font-weight: bold; }
				
 	--&gt;


</style> 
		</head>
	<body>
		<h1> 
			<xsl:value-of select="name" />
		</h1> <h4 class="address"> <a href="http://ndpsoftware.com">NDP Software</a>&#x2022; 
			<xsl:value-of select="address/street" />
			&#x2022; 
			<xsl:value-of select="address/city" />
			<br />
			Land 
			<xsl:value-of select="phone" />
			&#x2022; Mobile 
			<xsl:value-of select="cell" />
			&#x2022; Email: 
			<xsl:value-of select="email" />
		</h4> <h3> <a name="goal"> </a> Goal </h3> 
		<p>
			<xsl:value-of select="goal[@goal=$goal]" />
		</p>
		<h3> <a name="summary"> </a> Overview </h3> 
		<ul>
			<xsl:apply-templates select="//strength[contains(@goal,$goal)]" />
			<xsl:if test="contains($languagesPlacement,'header')">
				<li><xsl:call-template name="showElements">
					<xsl:with-param name="label" select="//skillLabel[@type='language']" />
					<xsl:with-param name="elementList" select=".//skill[@type='language']" />
				</xsl:call-template></li>
			</xsl:if>
			<xsl:if test="contains($toolsPlacement,'header')">
				<li><xsl:call-template name="showElements">
					<xsl:with-param name="label" select="//skillLabel[@type='software']" />
					<xsl:with-param name="elementList" select=".//skill[@type='software']" />
				</xsl:call-template></li>
			</xsl:if>
			<xsl:if test="contains($technologiesPlacement,'header')">
				<li><xsl:call-template name="showElements">
					<xsl:with-param name="label" select="//skillLabel[@type='technology']" />
					<xsl:with-param name="elementList" select=".//skill[@type='technology']" />
				</xsl:call-template></li>
			</xsl:if>

			<xsl:if test="contains($featuredSkills, 'designer')">
			<li><xsl:call-template name="showElements">
				<xsl:with-param name="label" select="//skillLabel[@type='designer']" />
				<xsl:with-param name="elementList" select=".//skill[@type='designer']" />
			</xsl:call-template></li>
			</xsl:if>

		</ul>

		<h3> <a name="experience"> </a> Work Experience </h3> 
		<xsl:for-each select="//job">
			<xsl:sort select="date/@year" order="descending" />
			<xsl:call-template name="showJob" />
		</xsl:for-each>
		<xsl:if test="contains($languagesPlacement,'section')">
			<h3> <a name="languages"> </a> <xsl:value-of select="//skillLabel[@type='language']" /></h3> 
			<p><xsl:call-template name="showElements">
				<xsl:with-param name="label"  />
				<xsl:with-param name="elementList" select=".//skill[@type='language']" />
			</xsl:call-template></p>
		</xsl:if>
		<xsl:if test="contains($toolsPlacement,'section')">
			<h3> <a name="tools"> </a> <xsl:value-of select="//skillLabel[@type='software']" /></h3> 
			<p><xsl:call-template name="showElements">
				<xsl:with-param name="label"  />
				<xsl:with-param name="elementList" select=".//skill[@type='software']" />
			</xsl:call-template></p>
		</xsl:if>
		<xsl:if test="contains($technologiesPlacement,'section')">
			<h3> <a name="tools"> </a> <xsl:value-of select="//skillLabel[@type='technology']" /></h3> 
			<p><xsl:call-template name="showElements">
				<xsl:with-param name="label"  />
				<xsl:with-param name="elementList" select=".//skill[@type='technology']" />
			</xsl:call-template></p>
		</xsl:if>
		<h3> <a name="education"> </a> Education </h3> 
		<xsl:apply-templates select="//institution" />
		<h3> <a name="community"> </a> Community </h3> 
		<xsl:apply-templates select="//organization" />
		<xsl:if test="contains($languagesPlacement,'footer') or contains($toolsPlacement,'footer') or contains($technologiesPlacement,'footer')">
		<h3> <a name="summary"> </a> Summary </h3> 
			<xsl:if test="contains($languagesPlacement,'footer')">
				<xsl:call-template name="showElements">
					<xsl:with-param name="label" select="//skillLabel[@type='language']" />
					<xsl:with-param name="elementList" select=".//skill[@type='language']" />
				</xsl:call-template>
			</xsl:if>
			<xsl:if test="contains($toolsPlacement,'footer')">
				<xsl:call-template name="showElements">
					<xsl:with-param name="label" select="'Tools'" />
					<xsl:with-param name="elementList" select=".//skill[@type='software']" />
				</xsl:call-template>
			</xsl:if>
			<xsl:if test="contains($technologiesPlacement,'footer')">
				<xsl:call-template name="showElements">
					<xsl:with-param name="label" select="//skillLabel[@type='technology']" />
					<xsl:with-param name="elementList" select=".//skill[@type='technology']" />
				</xsl:call-template>
			</xsl:if>
		</xsl:if>
		</body>
		</html>
	</xsl:template>
<!--


-->
	<xsl:template match="company/name|organization/name|institution/name">
		<xsl:if test="string-length(../@href)&gt;0">
			<xsl:element name="a">
				<xsl:attribute name="href"><xsl:value-of select="../@href" /></xsl:attribute>
				<xsl:attribute name="target"><xsl:value-of select="'_new'" /></xsl:attribute>
				<xsl:value-of select="." />
			</xsl:element>
		</xsl:if>
		<xsl:if test="string-length(../@href)=0">
				<xsl:value-of select="." />
		</xsl:if>
	</xsl:template>
<!--


-->
	<xsl:template match="strength">
		<li>
			<xsl:value-of select="." />
		</li>
	</xsl:template>
<!--


-->
	<xsl:template match="//institution">
		<p><b><xsl:apply-templates select="./name" /></b>
		<xsl:value-of select="degree" />
		<xsl:value-of select="honors" />
		<xsl:value-of select="class" /></p>
	</xsl:template>
<!--


-->
	<xsl:template match="//organization">
		<p><b><xsl:apply-templates select="./name" />&#160;
		<xsl:value-of select="title" /></b>
		<xsl:value-of select="description" /></p>
	</xsl:template>
<!--


-->
	<xsl:template match="project" name="showProject">
		<div class="project">
			<xsl:if test="string-length(date)">
			<span class="date"> 
				<xsl:value-of select="date" />
			</span></xsl:if> <xsl:if test="string-length(title)"><span class="title"> 
				<xsl:value-of select="title" />
			</span></xsl:if> 
			<xsl:if test="contains($clientPlacement,'withProject') and count(company/name)>0">
				&#x2022; <span class="company"> 
					<xsl:apply-templates select="company/name" />
				</span><span class="company-description"> 
					<xsl:value-of select="company/description" />
				</span> 
			</xsl:if>
			<xsl:if test="string-length(description)">
			<span class="description"> 
				<xsl:value-of select="description" />
			</span>
			</xsl:if>
			<xsl:if test="contains($languagesPlacement,'withProject')">
				<xsl:call-template name="showElements">
					<xsl:with-param name="label" select="//skillLabel[@type='language']" />
					<xsl:with-param name="elementList" select=".//skill[@type='language']" />
				</xsl:call-template>
			</xsl:if>
			<xsl:if test="contains($toolsPlacement,'withProject')">
				<xsl:call-template name="showElements">
					<xsl:with-param name="label" select="'Tools'" />
					<xsl:with-param name="elementList" select=".//skill[@type='software']" />
				</xsl:call-template>
			</xsl:if>
			<xsl:if test="contains($technologiesPlacement,'withProject')">
				<xsl:call-template name="showElements">
					<xsl:with-param name="label" select="//skillLabel[@type='technology']" />
					<xsl:with-param name="elementList" select=".//skill[@type='technology']" />
				</xsl:call-template>
			</xsl:if>
		</div>
	</xsl:template>
<!--


-->
	<xsl:template match="role">
		<div class="role">
			<span class="title"> 
				<xsl:value-of select="title" />
			</span><xsl:text>&#160;</xsl:text><span class="description"> 
				<xsl:value-of select="description" />
			</span> 
			<xsl:for-each select="project">
				<xsl:sort select="date/@year" order="descending" />
				<xsl:call-template name="showProject" />
			</xsl:for-each>
		</div>
	</xsl:template>
<!--


-->
	<xsl:template name="showJob">
		<div class="job">
			<span class="date"> 
				<xsl:value-of select="date" />
			</span> <span class="company"> 
			<xsl:apply-templates select="company/name" />
			</span> &#x2022; <span class="title"> 
				<xsl:value-of select="title" />
			</span> <span class="company-description"> 
				<xsl:value-of select="company/description" />
			</span> 
			<xsl:value-of select="description" />
			<xsl:variable name="projectsCount">
				<xsl:value-of select="count(.//project)" />
			</xsl:variable>
			<xsl:if test="contains($clientPlacement,'withJob') or ($projectsCount=0 and contains($clientPlacement,'withProject') )">
				<xsl:if test="count(company)">
					<xsl:call-template name="showElements">
						<xsl:with-param name="label" select="'Clients'" />
						<xsl:with-param name="elementList" select=".//project/company/name" />
						<xsl:with-param name="sort" select="'true'" />
					</xsl:call-template>
				</xsl:if>
			</xsl:if>
			<xsl:if test="contains($languagesPlacement,'withJob') or ($projectsCount=0 and contains($languagesPlacement,'withProject') )">
				<xsl:call-template name="showElements">
					<xsl:with-param name="label" select="//skillLabel[@type='language']" />
					<xsl:with-param name="elementList" select=".//skill[@type='language']" />
				</xsl:call-template>
			</xsl:if>
			<xsl:if test="contains($toolsPlacement,'withJob') or ($projectsCount=0 and contains($toolsPlacement,'withProject') )">
				<xsl:call-template name="showElements">
					<xsl:with-param name="label" select="'Tools'" />
					<xsl:with-param name="elementList" select=".//skill[@type='software']" />
				</xsl:call-template>
			</xsl:if>
			<xsl:if test="contains($technologiesPlacement,'withJob') or ($projectsCount=0 and contains($technologiesPlacement,'withProject') )">
				<xsl:call-template name="showElements">
					<xsl:with-param name="label" select="//skillLabel[@type='technology']" />
					<xsl:with-param name="elementList" select=".//skill[@type='technology']" />
				</xsl:call-template>
			</xsl:if>
			<xsl:apply-templates select="role" />
			<xsl:apply-templates select="./project" />
		</div>
	</xsl:template>
<!--


-->
	<xsl:template name="showElements">
		<xsl:param name="elementList" />
		<xsl:param name="emptyMessage" />
		<xsl:param name="label"></xsl:param>
		<span class="list"> 
			<xsl:choose>
				<xsl:when test="$elementList">
						<xsl:if test="string-length($label)">
					<span class="listLabel">
						<xsl:value-of select="$label" />
						<xsl:text>: 
						</xsl:text>
					</span></xsl:if><span class="listItems"> 
						
						<xsl:variable name="sortedElementList">
							<xsl:call-template name="sortElements">
								<xsl:with-param name="elements" select="$elementList" />
							</xsl:call-template>
						</xsl:variable>
						
						<xsl:variable name="uniqueElementList">
							<xsl:call-template name="removeDuplicates">
							   <xsl:with-param name="elementList" select="$sortedElementList" />
						    </xsl:call-template>
						</xsl:variable>
						
						<xsl:call-template name="writeList">
							<xsl:with-param name="elementList" select="$uniqueElementList" />
						</xsl:call-template>
					</span> 
				</xsl:when>
				<xsl:otherwise>
<!-- spit out a note that this is not used -->
					<span class="note"> 
						<xsl:value-of select="$emptyMessage" />
					</span> 
				</xsl:otherwise>
			</xsl:choose>
		</span> 
	</xsl:template>
<!--


-->
	<xsl:template name="sortElements">
		<xsl:param name="elements" />
		<ol>
			<xsl:for-each select="$elements">
				<xsl:sort select="normalize-space(.)" data-type="text"/>
				<li><xsl:value-of select="." /></li>
			</xsl:for-each>
		</ol>
	</xsl:template>
	<!--
		
		
	-->
	<xsl:template name="removeDuplicates">
		<xsl:param name="elementList" />
		<ol>
		<xsl:call-template name="removeDuplicatesPrivate">
			<xsl:with-param name="elementList" select="$elementList" />
		</xsl:call-template>
		</ol>
	</xsl:template>
	<!--
		
		
	-->
	<!-- private recursive function to remove duplicates from a sorted list.  -->
	<!-- elementList is of the format list/value -->
	<xsl:template name="removeDuplicatesPrivate">
		<xsl:param name="elementList" />

		<xsl:variable name="lastElement" select="normalize-space($elementList/ol/li[position()=last()])" />
		<xsl:variable name="front" >
			<ol>
			<xsl:for-each select="$elementList/ol/li[position()!=last()]"><li><xsl:value-of select="." /></li>
			</xsl:for-each></ol>
		</xsl:variable>
		<xsl:variable name="penultimateElement" select="normalize-space($front/ol/li[position()=last()])" />
		
		<xsl:if test="count($front//li) > 0" >
			<xsl:call-template name="removeDuplicatesPrivate">
				<xsl:with-param name="elementList" select="$front" />
			</xsl:call-template>
		</xsl:if>
		<xsl:if test="$penultimateElement != $lastElement or count($front//li) = 0">
			<li><xsl:value-of select="$lastElement" /></li>
		</xsl:if>
	</xsl:template>
<!--


-->
	<xsl:template name="writeList">
<!-- private recursive function to write the given list out, separated by commas -->
<!-- elementList is of the format list/value -->
		<xsl:param name="elementList" />
		<xsl:for-each select="$elementList/ol/li" >
			<xsl:value-of select="normalize-space(.)"/>
			<xsl:if test="position()!=last()">
		<xsl:text>, 
		</xsl:text>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>
