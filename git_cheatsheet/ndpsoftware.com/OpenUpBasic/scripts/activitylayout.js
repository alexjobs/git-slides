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


function getUrlParameters(queryStr)
{
	var arr = new Array();	
	var pairs = queryStr.split("&");
   	for (var i = 0; i < pairs.length; i++) {
     		var pos = pairs[i].indexOf('=');
     		if (pos == -1) continue;
     		var argname = pairs[i].substring(0,pos);
     		var value = pairs[i].substring(pos+1);    	
     		arr[argname] = value;
	}
	
	return arr;
}

function getTabUrl(url, queryString)
{
	if ( queryString == null ) queryString = "";
	//alert(url + queryString);
	return url + queryString;
}

function getActivityItemUrl(url, process, elementProcessPath, relProcessPath)
{
	queryString = "?proc=" + process + "&path=" + elementProcessPath + relProcessPath;
	//alert(url + queryString);
	return url + queryString;
	
}

function getDiagramImageUrl(process, elementProcessPath, diagramType)
{
	// get the diagram image file for the specified element path and process
	// retutns null if noting
	// diagram type is Activity, ActivityDetail, 
	//alert("get " + diagramType + " diagram for " + elementProcessPath);
	return imageFiles[elementProcessPath+diagramType];
}

function isSuppressed(process, elementProcessPath)
{
	flag = (suppressedItems[elementProcessPath] == true);
	//if ( flag ) alert("got one: " + elementProcessPath);
		
	return flag;
}

function buildTeamTree(proc, path, teamTree) {	
	
	if ( teamTree == null || teamTree.length == 0 ) {
		return;
	}
	
	teamTree[0][0] = teamTree[0][0].replace(/(\'|\")/g, "\\$1");

	var teamBuffer = "";
	for ( var i = 0; i < teamTree.length; i++ ) {

		if ( !isTeamSuppressed(proc, path, teamTree[i]) ) {
			teamBuffer += "<div class=\"teamStructure\" align=\"left\">";
			teamBuffer += getTeamTreeHtml(proc, path, teamTree[i]);
			teamBuffer += "</div><br/>";
		}

	}
	
	//alert(teamBuffer);
	document.write(teamBuffer);
}


// format is [url, title, relPath, suppressed]
function getTeamTreeHtml(proc, path, teamTree) {

	if ( teamTree == null || teamTree.length < 4) {
		return "";
	}

	var url = teamTree[0];
	var title = teamTree[1];
	var relPath = teamTree[2];
	
	var teamBuffer = 
		"<a href=\"javascript:location.href=getActivityItemUrl('" + url + "', par_proc, par_path, '" + relPath + "');\">" + title + "</a>";
		
	if ( teamTree.length > 4 && teamTree[4] != null && teamTree[4] != "" && teamTree[4] != undefined ) {
		teamBuffer += "<ul>";
		for ( var i = 4; i < teamTree.length; i++ ) {
			if (typeof teamTree[i] == "object" && !isTeamSuppressed(proc, path, teamTree[i]) ) {

				teamBuffer += "<li>";
				teamBuffer += getTeamTreeHtml(proc, path, teamTree[i]);
				teamBuffer += "</li>";
			}
		}
		teamBuffer += "</ul>";
	}

	return teamBuffer;
}

function isTeamSuppressed(proc, path, teamTree) {

	if ( teamTree == null || teamTree.length < 4) {
		return true;
	}
	
	var relPath = teamTree[2];
	var sup = teamTree[3];

	if ( sup == "" ) {
		return isSuppressed(proc, path + relPath);
	} else {
		return (sup == "true");
	}
	
}



// define two arrays for process spcicif activity images and supressed items
// the details will be filled by publishing
var imageFiles = new Array();
var suppressedItems = new Array();

// dynamically generated layout info from RMC publishing service 
imageFiles["_0uyGoMlgEdmt3adZL5Dmdw,_467NIhOKEduCNqgZdt_OaA,_0DMlYPinEdmugcVr9AdHjQActivity"]="./../../openup_basic/capabilitypatterns/resources/develop_requirement_within_context__0DMlYPinEdmugcVr9AdHjQ_bb823078_Activity.jpeg"
imageFiles["_0uyGoMlgEdmt3adZL5Dmdw,_467NIhOKEduCNqgZdt_OaA,_0DMlYPinEdmugcVr9AdHjQActivityDetail"]="./../../openup_basic/capabilitypatterns/resources/develop_requirement_within_context__0DMlYPinEdmugcVr9AdHjQ_bb823078_ActivityDetail.jpeg"
suppressedItems["_0uyGoMlgEdmt3adZL5Dmdw,_467NIhOKEduCNqgZdt_OaA,_0DMlYPinEdmugcVr9AdHjQ,_iJwqcDLvEdueZPye-FaNgA"]=true
imageFiles["_0rQRgMlgEdmt3adZL5Dmdw,_0DMlYPinEdmugcVr9AdHjQActivity"]="./../../openup_basic/capabilitypatterns/resources/develop_requirement_within_context__0DMlYPinEdmugcVr9AdHjQ_51153c26_Activity.jpeg"
imageFiles["_0rQRgMlgEdmt3adZL5Dmdw,_0DMlYPinEdmugcVr9AdHjQActivityDetail"]="./../../openup_basic/capabilitypatterns/resources/develop_requirement_within_context__0DMlYPinEdmugcVr9AdHjQ_51153c26_ActivityDetail.jpeg"
suppressedItems["_0rQRgMlgEdmt3adZL5Dmdw,_0DMlYPinEdmugcVr9AdHjQ,_iJwqcDLvEdueZPye-FaNgA"]=true
