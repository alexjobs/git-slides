<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!--
    Copyright (c) 2003 by Andrew J. Peterson <andy@ndpsoftware.com>
    NDP Software
    All Rights Reserved.

    Examines the struts-config and looks for inconsistencies and reports
    the errors to a text file (right now). You can configure the output
    with the bottlenecks below.

    Motivation
    The "path" attribute is inconsistent within the struts config.
    If you don't get it right, things just don't work during deployment, and
    there is no verification of this until you visit the page.
    These tests are clear, and should be included as part of a struts deployment
    for everyone.

    To use this:
    - first, before you even both with this, get the struts-config verifying against
    the DTD supplied by Apache. If you aren't using it, you will find some errors.
    - add a <style> task to your ant build file, which runs before your deployment -
    as early as possible, really. This can look like this:
       <style style="struts-config-verify.xsl"
              in="struts-config.xml"
              out="struts-config-errors.txt"/>
.   Of course, you will need to adjust the paths accordingly.
    - watch for errors.

    Please get back to me about modifications and additions so this can be improved.

    Thanks,
    Andrew Peterson
    San Francisco
    June 21, 2003

    -->
    <xsl:output method="text" indent="no"/>
    <xsl:strip-space elements="*"/>

    <xsl:template match="//action">
        <xsl:if test="not(starts-with(@path, '/'))">
            <xsl:call-template name="output-error">
                <xsl:with-param name="message">
                    <xsl:text>&lt;action&gt;[path] "</xsl:text>
                    <xsl:value-of select="@path"/>
                    <xsl:text>" doesn't start with slash (so it won't work). Change </xsl:text>
                    <xsl:value-of select="@path"/>
                    <xsl:text> to /</xsl:text>
                    <xsl:value-of select="@path"/>
                    <xsl:text>.&#10;</xsl:text>
                </xsl:with-param>
            </xsl:call-template>
        </xsl:if>
        <xsl:if test="contains(@path, '.do')">
            <xsl:call-template name="output-error">
                <xsl:with-param name="message">
                    <xsl:text>&lt;action&gt;[path] "</xsl:text>
                    <xsl:value-of select="@path"/>
                    <xsl:text>" ends with ".do" (so it won't work).&#10;  Remove the ".do" from </xsl:text>
                    <xsl:value-of select="@path"/>
                    <xsl:text>.&#10;</xsl:text>
                </xsl:with-param>
            </xsl:call-template>
        </xsl:if>
        <xsl:apply-templates select="@forward"/>
    </xsl:template>

    <xsl:template match="//action/@forward">
    	<!-- These are very restrictive rules and might need to be extended for your case. -->
        <xsl:if test="not(contains(., '.do')) and not(contains(., '.jsp'))">
            <xsl:call-template name="output-warning">
                <xsl:with-param name="message">
                    <xsl:text>&lt;action&gt;[forward] "</xsl:text>
                    <xsl:value-of select="."/>
                    <xsl:text>" for path "</xsl:text>
                    <xsl:value-of select="../@path"/>
                    <xsl:text>" does not end with ".do" or ".jsp". Did you forget something?&#10;</xsl:text>
                </xsl:with-param>
            </xsl:call-template>
        </xsl:if>
    </xsl:template>

    <xsl:template match="//global-forwards/forward">
        <xsl:if test="not(contains(@path, '.do')) and not(contains(@path, '.jsp'))">
            <xsl:call-template name="output-warning">
                <xsl:with-param name="message">
                    <xsl:text>&lt;global-forwards&gt;/&lt;forward&gt;[path] "</xsl:text>
                    <xsl:value-of select="@path"/>
                    <xsl:text>" does not end with ".do" or ".jsp". Did you forget something?&#10;</xsl:text>
                </xsl:with-param>
            </xsl:call-template>
        </xsl:if>
    </xsl:template>


    <!-- Output bottlenecks.
         You may want to customize these to output in a different manner -->
    <xsl:template name="output-warning">
        <xsl:param name="message"/>
        <xsl:message>
            <xsl:value-of select="$message"/>
        </xsl:message>
        <xsl:value-of select="$message"/>
    </xsl:template>

    <xsl:template name="output-error">
        <xsl:param name="message"/>
        <xsl:message terminate="yes">
            <xsl:value-of select="$message"/>
        </xsl:message>
        <xsl:value-of select="$message"/>
    </xsl:template>

</xsl:stylesheet>
