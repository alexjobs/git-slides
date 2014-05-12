//------------------------------------------------------------------------------
// Copyright (c) 2005, 2006 IBM Corporation and others.
// All rights reserved. This program and the accompanying materials
// are made available under the terms of the Eclipse Public License v1.0
// which accompanies this distribution, and is available at
// http://www.eclipse.org/legal/epl-v10.html
// 
// Contributors:
// IBM Corporation - initial implementation
//------------------------------------------------------------------------------

var tree_node_class  = "treeNode";
var expandImage;
var collapseImage;
var shimImage;
var wbsItemHtml;
var imagePath;
var NODE_COLLAPSED = 0;
var NODE_EXPANDED = 1;
var DEFAULT_EXPAND_LEVEL = 0; // 0 - collapse all, 1 - expand the first level, ..., 9999 - if you have this many

// Creates the collapsible tree table
// the expected format of the html source are as follows:
// each <TR tag has a uinque id and a parentId.
/*
<head>
<META http-equiv="Content-Type" content="text/html; charset=utf-8">
<link type="text/css" href="./css/default.css" rel="StyleSheet">
<script src="./treetable.js" type="text/javascript" language="JavaScript"></script>
</head>
<body onload="createTree('td', 'treeNode', './images/');" >
<table border="1">
<tr id="1" parentId="0">
<td class="treeNode">col 1-1</td><td>col 1-2</td>
</tr>

<tr id="2" parentId="1">
<td class="treeNode">col 1-1</td><td>col 2-2</td>
</tr>

<tr id="3" parentId="1">
<td class="treeNode">col 1-1</td><td>col 2-2</td>
</tr>

<tr id="4" parentId="0">
<td class="treeNode">col 2-1</td><td>col 2-2</td>
</tr>
</table>
</body>
*/

function initialize(imgPath)
{

	imagePath = imgPath;
	expandImage = imgPath + 'expand.gif';	
	collapseImage = imgPath + 'collapse.gif';
	//expandAllImage = imgPath + 'expand_all.gif';	
	//collapseAllImage = imgPath + 'collapse_all.gif';
	//backToTopImage = imgPath + 'back_to_top.gif';
	shimImage = imgPath + 'indent.gif';
	wbsItemHtml = new WBSItemHtml();
	wbsItemHtml.init();
}

function createTree(tagName, classSelector, imgPath) {

	tree_node_class = classSelector;
	
	if (document.getElementsByTagName) {
		
		//alert("start");
		
		// save map of parentId to parent TR to improve performance
		var createdNodes = new Array();

		var elements = document.getElementsByTagName(tagName);
		//var sectionElements = new Array(elements.length);
		//var totalLinks = 0;
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			if (element.className == classSelector ) 
			{
				var indentSize = 0;
				var trElement= getTR(element);	
				var parentId = trElement.getAttribute("parentId");
				parentTR  = null;
				if ( parentId != "")
				{
				
					// cache it to be faster
					//parentTR = document.getElementById(trElement.parentId);
					parentTR = createdNodes[parentId];
					if ( parentTR != null && parentTR != undefined )
					{
						indentSize = parseInt(parentTR.getAttribute("indentSize")) + 1;
					}
				}
				
				var expanded = getDefaultExpandState(indentSize);
				
				trElement.setAttribute("indentSize", indentSize);
				trElement.setAttribute("expanded", expanded);
								
				//alert("createTreeNode for id, parentId, indent =" + trElement.id + ", " + parentId + ",  indentSize=" + indentSize);
				//createTreeNode(element, indentSize);
				
				//save the created ones so we can referecne it
				createdNodes[trElement.id] = trElement;
				
				
				if ( (parentTR != null) && isNodeSuppressed(parentTR) )
				{
					setNodeSuppressed(trElement, true);
					//alert("parent suppressed");
				}

				if ( isNodeSuppressed(trElement) == true || (parentTR != null && parentTR.getAttribute("expanded") == NODE_COLLAPSED) )
				{
					trElement.style.display = 'none';
					//alert("suppressed");
				}
			}
		}
		
		//alert("end");
		
	}
}


function getDefaultExpandState(level)
{

	if (level >= DEFAULT_EXPAND_LEVEL ) {
		return NODE_COLLAPSED;
	} else {
		return NODE_EXPANDED;
	}

}

function getTreeNodeSrc(level)
{
	if ( getDefaultExpandState(level) == NODE_COLLAPSED ) {
		return expandImage;
	}
	else {
		return collapseImage;
	}
}


function getTR(element)
{
	// the heml structure is
	// <tr id="2" parentId="1">
	// <td class="treeNode">col 1-1</td><td>col 2-2</td>
	// </tr>
	var e = element;
	while ( e != null && e.tagName != "TR" || e.className != tree_node_class)
	{	
		e = e.parentNode;
		//alert(e.tagName);
	}
	
	return e;
}


// Creates a collapsible section.
function createTreeNode(element, indentSize) {
	
	//alert("indentSize=" + indentSize);

	if (document.createElement) {
			
		// Add a expand/collapse link to the tree node heading.
		var span = document.createElement('span');
		if ( indentSize > 0 )
		{
			var width = 17*indentSize;			
			var space = document.createElement('img');
			space.src = shimImage;
			space.width = width;
			space.height = '15';
			space.border = '0';
			span.appendChild(space);
		}

		var image = document.createElement('img');
		image.width = '17';
		image.height = '15';
		image.border = '0';
		image.align = 'absmiddle';

		if ( hasChildren(element) )
		{
			image.src = getTreeNodeSrc(indentSize);			
			
			var link = document.createElement('a');
			link.href = '#';
			link.appendChild(image);
			link.onclick = expandCollapseTreeNode;
			span.appendChild(link);
		}
		else 
		{
			image.src = shimImage;
			span.appendChild(image);
		}
		
				
		element.insertBefore(span, element.firstChild);
		element.appendChild(document.createTextNode(String.fromCharCode(160)));
		element.appendChild(document.createTextNode(String.fromCharCode(160)));		   		
	}
}



// Expands or collapses a section based on the received event.
function expandCollapseTreeNode(evtElement) {

//alert(evtElement.tagName);


	var trElement = getTR(evtElement);
	
	// if there is no child, remove the tree node image
	if ( !hasChildren(trElement) )
	{
		evtElement.src = shimImage;
		evtElement.onclick = null;
		evtElement.style.cursor = "default";
		return false;
	}
	
	var expanded = trElement.getAttribute("expanded");

	if (expanded == NODE_EXPANDED) {
		hideChildren(trElement);
		evtElement.src = expandImage;
		expanded = NODE_COLLAPSED;
	}
	else {
		showHideChildren(trElement, true);
		evtElement.src = collapseImage;
		expanded = NODE_EXPANDED;
	}
	
	trElement.setAttribute("expanded", expanded);
	
	/*
	if (evt && evt.preventDefault) {
		evt.preventDefault();
	}
	*/
	
	return false;
}


function hideChildren(parent)
{	
	// make sure it's the TR element
	parent = getTR(parent);
	//var parentId = parent.id;
	var indentSize = parseInt(parent.getAttribute("indentSize"));
	var nextTR = parent;
	while ( (nextTR=getNextSibling(nextTR)) != null && nextTR.getAttribute("indentSize") > indentSize )
	{		
		nextTR.style.display = 'none';		
	}
		
}


function showHideChildren(parent, show)
{		
	// make sure it's the TR element
	parent = getTR(parent);
	
	//var indentSize = parent.indentSize;
	var nextTR = getNextSibling(parent);
	while ( nextTR != null && nextTR.getAttribute("parentId") == parent.id )
	{
		if ( show && (isNodeSuppressed(nextTR) == false) )
		{
			nextTR.style.display = '';
		}
		else
		{
			
			nextTR.style.display = 'none';
		}
		
		nextTR = showHideChildren(nextTR, (show==true)&&(nextTR.getAttribute("expanded")==NODE_EXPANDED) );
	}
	
	return nextTR;
	
}


function hasChildren(parent)
{

	// make sure it's the TR element
	parent = getTR(parent);

	var nextTR = getNextSibling(parent);
	
//alert("parent.id=" + parent.id + ", nextTR.parentId=" + nextTR.getAttribute("parentId") + ", isSuppressed=" + isNodeSuppressed(nextTR));

	if ( nextTR != null && nextTR.getAttribute("parentId") == parent.id) 
	{
		if (isNodeSuppressed(nextTR) == false)
		{
			return true;
		}
		else
		{
			nextTR.nextSibling;
			while (nextTR != null)
			{
				if (isNodeSuppressed(nextTR) == false)
				{
					return true;
				}
				nextTR = nextTR.nextSibling;
			}
			return false;
		}
	}
	
	return false;
}


function getNextSibling(element)
{

	var nextElement = element.nextSibling;
	while (nextElement != null && nextElement.tagName != element.tagName )
	{
		nextElement = nextElement.nextSibling;
	}
	
	return nextElement;
}

function getFirstChild(trElement, tagName, className)
{
	var e = trElement.firstChild;
	while (e != null)
	{
	alert(e.tagName);
		if ( (tagName == null || e.tagName == tagName) && (className == null || e.className == className) )
		{
			return e;;
		}
		
		e = e.nextSibling;
	}
	
	return null;
		
}

function isNodeSuppressed(trElement)
{
	// if isSupressed attribute is defined, always use it
	// only browsign model set this attribute
	// if not defined, it's in published site, look up the flag from the generated map
	attr_suppressed = trElement.getAttribute("isSupressed");
	
	if ( attr_suppressed == null || attr_suppressed == "" || attr_suppressed == undefined )
	{
		// this method is defined in activitylayout.js
		relPath = trElement.getAttribute("relProcessPath");
		flag = false;
		if ( relPath != null && relPath != "" && relPath != undefined )
		{
			flag = isSuppressed(par_proc, par_path + relPath);
		}
		setNodeSuppressed(trElement, flag);
		
		return flag;
	}
	else
	{
		return (attr_suppressed == "true");
	}
}


function setNodeSuppressed(trElement, flag)
{
	trElement.setAttribute("isSupressed", flag ? "true" : "false");
		
}


/*
// find the child from div
// <div class="treeNode">[<span><img ...]
// replace the inner html for <div>
function setTreeNodeImage(divElement, imgsrc, onclick)
{
	var div = getFirstChild(trElement, "DIV", tree_node_class);
	alert("div=" + div);

	if ( div != null )
	{
		var span = getFirstChild(div, "SPAN", null);
		if ( span != null )
		{
			var img = getFirstChild(span, "IMG", null);
			if ( img != null )
			{
				img.src = imgsrc;
				img.onclick = onclick;
				
				alert(img.src);
			}
		}
	}
	
}
*/

function writeTreeNodeTable(indentSize, hasChildren, title, url, relPath)
{
	src = getTreeNodeTableHtml(indentSize, hasChildren, title, url, relPath);
	document.write(src);

}

function getTreeNodeTableHtml(indentSize, hasChildren, title, url, relPath)
{

// the url is passed in to a string to construct a string literal
// need to escape the quotes
url = url.replace(/(\'|\")/g, "\\$1");

var src = 
"<table bgcolor=\"#000000\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"defaultTable\"><tr><td nowrap=\"nowrap\">" + 
getTreeNodeHtml(indentSize, hasChildren) + 
"</td><td width=\"100%\" nowrap=\"nowrap\">" + 
"<a href=\"javascript:location.href=getActivityItemUrl('" + url + "', par_proc, par_path, '" + relPath + "');\">" + title + "</a>" + 
"</td></tr></table>";

	return src;
}


function getTreeNodeHtml(indentSize, hasChildren)
{
	var width = 17*indentSize;

	var str = "<div class=\"treeNode\"><span>";
	if ( indentSize > 0 )
	{
		str += "<img width=\"" + width + "\" height=\"15\" border=\"0\" src=\"" + shimImage + "\"/>";
	}


	var imgSrc;
	
	if ( !hasChildren )
	{
		str += "<img width=\"17\" height=\"15\" border=\"0\" align=\"absmiddle\" src=\"" + shimImage + "\">";

	}
	else 
	{
		imageSrc = getTreeNodeSrc(indentSize);
		
		str += "<img width=\"17\" height=\"15\" border=\"0\" align=\"absmiddle\" src=\"" + imageSrc + "\"" 
		   + " style=\"cursor:hand\" onclick=\"expandCollapseTreeNode(this);return false;\" />";
	}
	
	
	str += "</span>&#160;&#160;</div>";

	return str;	
}

// define the break down structure columns ids here
BS_COL_INDEX = "id";
BS_COL_PREFIX = "prefix";
BS_COL_PREDECESSORS = "predecessors";
BS_COL_IS_REPEATABLE = "is_repeatable";
BS_COL_IS_ONGOING = "is_ongoing";
BS_COL_IS_EVENT_DRIVEN = "is_event_driven";
BS_COL_ENTRY_STATE = "entry_state";
BS_COL_EXIT_STATE = "exit_state";
BS_COL_TEAMS = "teams";
BS_COL_TYPE = "type";
BS_COL_MODEL_INFO = "model_info";
BS_COL_PRESENTATION_NAME = "presentation_name"; 
BS_COL_STEPS = "steps";
BS_COL_DELIVERABLE = "deliverable"; 
BS_COL_IS_OPTIONAL = "is_optional"; 
BS_COL_IS_PLANNED = "is_planned";
BS_COL_HAS_MULTIPLE_OCCURRENCES = "has_multiple_occurrences";



function WBSItemHtml()
{
	var columns, fields;
	var indentSize, hasChildren, id, parentId, relPath, isSupressed, url;
	//var index, prefix, title, steps, predecessors, info, repeatable, multiOccurences, optional, planned, type;
}	

WBSItemHtml.prototype.init = function() {

	this.columns = new Array();
	this.fields  =  new Array();
}

WBSItemHtml.prototype.addColumn = function(id, label) {

	this.columns[this.columns.length] = [id, label];
	
}


WBSItemHtml.prototype.initRow = function(id, parentId, relPath, isSupressed, indentSize, hasChildren, 
	index, prefix, title, url, steps, predecessors, info, type, 
	repeatable, multiOccurences, optional, planned, ongoing, eventDriven, 
	team, entryState, exitState, deliverable)
{
	this.indentSize = indentSize;
	this.hasChildren = hasChildren;
	this.id = id;
	this.parentId = parentId;
	this.relPath = relPath;
	this.isSupressed = isSupressed;
	
	/*
	this.index = index;
	this.prefix = prefix;
	this.title = title;
	this.url = url;
	this.steps = steps;
	this.predecessors = predecessors;
	if (info.indexOf("extend") != -1)
	{
		this.info = "";
	}
	else
	{
		this.info = info;
	}	
	this.type = type;
	*/
	
	this.fields[BS_COL_INDEX] = index;
	this.fields[BS_COL_PREFIX] = prefix;
	this.fields[BS_COL_PRESENTATION_NAME] = title;
	this.url = url;
	this.fields[BS_COL_STEPS] = steps;
	this.fields[BS_COL_PREDECESSORS] = predecessors;
	if (info.indexOf("extend") != -1)
	{
		this.fields[BS_COL_MODEL_INFO] = "";
	}
	else
	{
		this.fields[BS_COL_MODEL_INFO] = info;
	}	
	this.fields[BS_COL_TYPE] = type;

	this.fields[BS_COL_TEAMS] = team;

	this.fields[BS_COL_ENTRY_STATE] = entryState;
	this.fields[BS_COL_EXIT_STATE] = exitState;
	this.fields[BS_COL_DELIVERABLE] = deliverable;
	
	this.setStates(repeatable, multiOccurences, optional, planned, ongoing, eventDriven);
	
	
}

WBSItemHtml.prototype.addStep = function(selected, lineBreak)
{
	var img_src;
	if ( selected ) {
		img_src = imagePath + "circle_close.gif";
	} else {
		img_src = imagePath + "circle_open.gif";	
	}
	
	steps = this.fields[BS_COL_STEPS];
	steps += "<img width=\"10\" height=\"9\" alt=\"\" src=\"" + img_src + "\" />";
	if (lineBreak)
	{
		steps += "<br/>";
	}
	
	this.fields[BS_COL_STEPS] = steps;
}


WBSItemHtml.prototype.setStates = function(repeatable, multiOccurences, optional, planned, ongoing, eventDriven)
{
	if ( repeatable == "true") {
		repeatable = "<img alt=\"\" height=\"15\" width=\"20\" src=\"" + imagePath + "true.gif\">";
	} else {
		repeatable = "&nbsp;";
	}
	
	if ( multiOccurences == "true") {
		multiOccurences = "<img alt=\"\" height=\"15\" width=\"20\" src=\"" + imagePath + "true.gif\">";
	} else {
		multiOccurences = "&nbsp;";
	}
	
	if ( optional == "true") {
		optional = "<img alt=\"\" height=\"15\" width=\"20\" src=\"" + imagePath + "true.gif\">";
	} else {
		optional = "&nbsp;";
	}

	if ( planned =="true") {
		planned = "<img alt=\"\" height=\"15\" width=\"20\" src=\"" + imagePath + "true.gif\">";
	} else {
		planned = "&nbsp;";
	}

	if ( ongoing =="true") {
		ongoing = "<img alt=\"\" height=\"15\" width=\"20\" src=\"" + imagePath + "true.gif\">";
	} else {
		ongoing = "&nbsp;";
	}
	
	if ( eventDriven =="true") {
		eventDriven = "<img alt=\"\" height=\"15\" width=\"20\" src=\"" + imagePath + "true.gif\">";
	} else {
		eventDriven = "&nbsp;";
	}
	
	
	this.fields[BS_COL_IS_REPEATABLE] = repeatable;
	this.fields[BS_COL_HAS_MULTIPLE_OCCURRENCES] = multiOccurences;
	this.fields[BS_COL_IS_OPTIONAL] = optional;
	this.fields[BS_COL_IS_PLANNED] = planned;
	this.fields[BS_COL_IS_ONGOING] = ongoing;
	this.fields[BS_COL_IS_EVENT_DRIVEN] = eventDriven;

}


WBSItemHtml.prototype.writeHeader = function()
{

	str = "<tr valign=\"top\">";
	for ( i = 0; i < this.columns.length; i++ ) {
		col = this.columns[i];
		str += "<th nowrap=\"nowrap\">" + col[1] + "</th>";
	}				
	
	str += "</tr>";
	document.write(str);			
}


WBSItemHtml.prototype.getCellHtml = function(columnCount) {
	col = this.columns[columnCount];
	col_id = col[0];
	text = this.fields[col_id];
	if ( text == "" ) {
		text = "&nbsp;";
	}
	
	var str = "<td";
	if ( columnCount % 2 != 0 ) {
		str += " bgcolor=\"#cccccc\"";
	}
	
	if ( col_id.indexOf("is_") >=0 || col_id.indexOf("has_") >=0 ) {	
		str += " align=\"center\"";
	}
	
	if ( col_id == BS_COL_TYPE ) {
		str += " nowrap=\"nowrap\"";
	}
	
	if ( col_id == BS_COL_PRESENTATION_NAME ) {
		str += " width=\"100%\">" + getTreeNodeTableHtml(
			this.indentSize, this.hasChildren, 
			text, this.url, this.relPath);
	} else {
		str += ">" + text;
	}
	
	str += "</td>";

	return str;

}

WBSItemHtml.prototype.writeRow = function()
{
	src = 	
"<tr class=\"treeNode\" id=\"" + this.id + "\" parentId=\"" + this.parentId + "\" relProcessPath=\"" + this.relPath + "\"";

// is suppressed flag is set only when in browsing model, it's not set in publishing model
if ( this.isSupressed != null && this.isSupressed != "" && this.isSupressed != undefined) {
	src += " isSupressed=\"" + this.isSupressed + "\"";
}

src += ">";

for ( i = 0; i < this.columns.length; i++ ) {
	src += this.getCellHtml(i);
}				

src += "</tr>";

/*	
src += "><td>" + this.index + "&nbsp;</td>" + 
"<td bgcolor=\"#cccccc\">" + this.prefix + "&nbsp;</td>" + 
"<td width=\"100%\">" + getTreeNodeTableHtml(this.indentSize, this.hasChildren, this.title, this.url, this.relPath) + "</td>" + 
"<td bgcolor=\"#cccccc\">" + this.steps + "&nbsp;</td>" + 
"<td>" + this.predecessors + "&nbsp;</td>" + 
"<td bgcolor=\"#cccccc\">" + this.info + "&nbsp;</td>" + 
"<td align=\"center\">" + this.repeatable + "</td>" + 
"<td align=\"center\" bgcolor=\"#cccccc\">" + this.multiOccurences + "</td>" + 
"<td align=\"center\">" + this.optional + "</td>" + 
"<td align=\"center\" bgcolor=\"#cccccc\">" + this.planned + "</td>" + 
"<td nowrap=\"nowrap\">" + this.type + "</td>" + 
"</tr>";

//alert(src);
*/
	document.write(src);
}
