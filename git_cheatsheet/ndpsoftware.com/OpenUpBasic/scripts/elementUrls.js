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


var elementUrls = new Array();

function buildProcessElementBreadCrumb(backPath) {

	var linksText = "";
	var paths = par_path.split(",");
	var path = "";
   	for (var i = 0; i < paths.length-1; i++) {
     		var guid = paths[i];
     		if ( path != "" ) path += ",";
     		path += guid;
     		var text = getProcessElementLinkHtmlFromId(guid, path, backPath);
     		if ( text != "" ) {
     			linksText += text + "&nbsp;>&nbsp";
     		}
	}

	linksText += getProcessElementLinkHtmlFromId(paths[paths.length-1], par_path, backPath);
	
	document.write("<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">");
	document.write("<tr><td align=\"right\">" + linksText + "</td><tr>");
	document.write("</table>");

}


function getProcessElementLinkHtmlFromId(guid, elementPath, backPath) {

	var str = "";
	var item = elementUrls[guid];
	if ( item != null ) {
		var text = item[0];
		var url = backPath + item[1];
		
		// escape the quotes
		url = url.replace(/'/g, "\\'");
		url = url.replace(/\"/g, "\\\"");
		
		str = "<a href=\"javascript:location.href=getActivityItemUrl('" + url + "', '" + par_proc + "', '" + elementPath + "', '');\">" + text + "</a>";
	}

	
	return str;
}

// dynamically generated element url info from RMC publishing service 


elementUrls["_wGeiAFY6EdqI9sTOt2pjHw"] = ["Use Case","openup_basic/capabilitypatterns/use_case,_wGeiAFY6EdqI9sTOt2pjHw.html"];
elementUrls["_5LsMUFY1EdqI9sTOt2pjHw"] = ["Request Change","openup_basic/capabilitypatterns/request_change,_5LsMUFY1EdqI9sTOt2pjHw.html"];
elementUrls["_MWLqSE9HEdudU75l2xOQTw"] = ["Use Case","openup_basic/capabilitypatterns/use_case,_MWLqSE9HEdudU75l2xOQTw.html"];
elementUrls["_4x060FY1EdqI9sTOt2pjHw"] = ["Any Role","openup_basic/capabilitypatterns/any_role,_4x060FY1EdqI9sTOt2pjHw.html"];
elementUrls["_MWLqQ09HEdudU75l2xOQTw"] = ["Implement Developer Tests","openup_basic/capabilitypatterns/impl_developer_tests,_MWLqQ09HEdudU75l2xOQTw.html"];
elementUrls["_BmbHQE_cEduE1dJ2XtzzkQ"] = ["Stakeholder","openup_basic/capabilitypatterns/stakeholder,_BmbHQE_cEduE1dJ2XtzzkQ.html"];
elementUrls["_lqOzsL-EEdqb7N6KIeDL8Q"] = ["Analyze Architectural Requirements","openup_basic/capabilitypatterns/analyze_arch_reqs,_lqOzsL-EEdqb7N6KIeDL8Q.html"];
elementUrls["_wGSUwFY6EdqI9sTOt2pjHw"] = ["Analyst","openup_basic/capabilitypatterns/analyst,_wGSUwFY6EdqI9sTOt2pjHw.html"];
elementUrls["_79bQ4DoCEdu0yYZ2bsCXog"] = ["Define Vision","openup_basic/capabilitypatterns/define_vision,_79bQ4DoCEdu0yYZ2bsCXog.html"];
elementUrls["_31E_YBOKEduCNqgZdt_OaA"] = ["Initial Operational Capability Milestone","openup_basic/deliveryprocesses/initial_operational_capability,_31E_YBOKEduCNqgZdt_OaA.html"];
elementUrls["_XKDWIFY5EdqI9sTOt2pjHw"] = ["Plan the Project","openup_basic/capabilitypatterns/plan_the_project,_XKDWIFY5EdqI9sTOt2pjHw.html"];
elementUrls["_os33gL3SEdqfrv3k16plXw"] = ["Work Items List","openup_basic/capabilitypatterns/work_items_list,_os33gL3SEdqfrv3k16plXw.html"];
elementUrls["_d6dIYFY4EdqI9sTOt2pjHw"] = ["Architectural Proof-of-Concept","openup_basic/capabilitypatterns/arch_poc,_d6dIYFY4EdqI9sTOt2pjHw.html"];
elementUrls["_ukbHgL-EEdqb7N6KIeDL8Q"] = ["Analyze Architectural Requirements","openup_basic/capabilitypatterns/analyze_arch_reqs,_ukbHgL-EEdqb7N6KIeDL8Q.html"];
elementUrls["_HTBBME_dEduE1dJ2XtzzkQ"] = ["Tester","openup_basic/capabilitypatterns/tester,_HTBBME_dEduE1dJ2XtzzkQ.html"];
elementUrls["_0oSdE8lgEdmt3adZL5Dmdw"] = ["Initiate Project","openup_basic/capabilitypatterns/initiate_project,_0oSdE8lgEdmt3adZL5Dmdw.html"];
elementUrls["_y-k0bOtQEdqc1LGhiSPqRg"] = ["Manage Iteration","openup_basic/capabilitypatterns/manage_iteration,_y-k0bOtQEdqc1LGhiSPqRg.html"];
elementUrls["_vAmGIL-EEdqb7N6KIeDL8Q"] = ["Develop the Architecture","openup_basic/capabilitypatterns/develop_arch,_vAmGIL-EEdqb7N6KIeDL8Q.html"];
elementUrls["_AdllQFY5EdqI9sTOt2pjHw"] = ["Build","openup_basic/capabilitypatterns/build,_AdllQFY5EdqI9sTOt2pjHw.html"];
elementUrls["_KAnAYE9PEdumneEH4I4Yqg"] = ["Analyst","openup_basic/capabilitypatterns/analyst,_KAnAYE9PEdumneEH4I4Yqg.html"];
elementUrls["_ZRfVYL-EEdqb7N6KIeDL8Q"] = ["Detail Requirements","openup_basic/capabilitypatterns/detail_requirements,_ZRfVYL-EEdqb7N6KIeDL8Q.html"];
elementUrls["_0o3r4slgEdmt3adZL5Dmdw"] = ["Inception Phase Iteration","openup_basic/capabilitypatterns/inception_phase_iteration,_0o3r4slgEdmt3adZL5Dmdw.html"];
elementUrls["_ezOKIE9DEdudU75l2xOQTw"] = ["Analyst","openup_basic/capabilitypatterns/analyst,_ezOKIE9DEdudU75l2xOQTw.html"];
elementUrls["_0sluQslgEdmt3adZL5Dmdw"] = ["Determine Architectural Feasibility","openup_basic/capabilitypatterns/determine_architectural_feasibility,_0sluQslgEdmt3adZL5Dmdw.html"];
elementUrls["_TPsdoEmSEduO0bs89Khm8Q"] = ["Assess Results","openup_basic/capabilitypatterns/assess_results,_TPsdoEmSEduO0bs89Khm8Q.html"];
elementUrls["_ezOKIk9DEdudU75l2xOQTw"] = ["Use Case","openup_basic/capabilitypatterns/use_case,_ezOKIk9DEdudU75l2xOQTw.html"];
elementUrls["_eG0SoEbpEduLBN1xMBngqw"] = ["Glossary","openup_basic/capabilitypatterns/glossary,_eG0SoEbpEduLBN1xMBngqw.html"];
elementUrls["_d6Q7IVY4EdqI9sTOt2pjHw"] = ["Architecture","openup_basic/capabilitypatterns/architecture,_d6Q7IVY4EdqI9sTOt2pjHw.html"];
elementUrls["_PJJ3AE_dEduE1dJ2XtzzkQ"] = ["Analyst","openup_basic/capabilitypatterns/analyst,_PJJ3AE_dEduE1dJ2XtzzkQ.html"];
elementUrls["_5v0NwBOKEduCNqgZdt_OaA"] = ["Product Release Milestone","openup_basic/deliveryprocesses/product_release,_5v0NwBOKEduCNqgZdt_OaA.html"];
elementUrls["_oSQYEL3SEdqfrv3k16plXw"] = ["Test Log","openup_basic/capabilitypatterns/test_log,_oSQYEL3SEdqfrv3k16plXw.html"];
elementUrls["_0pJ_xslgEdmt3adZL5Dmdw"] = ["Ongoing Tasks","openup_basic/capabilitypatterns/ongoing_tasks,_0pJ_xslgEdmt3adZL5Dmdw.html"];
elementUrls["_MWLqSk9HEdudU75l2xOQTw"] = ["Architectural Proof-of-Concept","openup_basic/capabilitypatterns/arch_poc,_MWLqSk9HEdudU75l2xOQTw.html"];
elementUrls["_mZDP4FY5EdqI9sTOt2pjHw"] = ["Project Manager","openup_basic/capabilitypatterns/project_manager,_mZDP4FY5EdqI9sTOt2pjHw.html"];
elementUrls["_MWFjpE9HEdudU75l2xOQTw"] = ["Design","openup_basic/capabilitypatterns/design,_MWFjpE9HEdudU75l2xOQTw.html"];
elementUrls["_Y5DAMb-EEdqb7N6KIeDL8Q"] = ["Supporting Requirements","openup_basic/capabilitypatterns/supporting_requirements,_Y5DAMb-EEdqb7N6KIeDL8Q.html"];
elementUrls["_qQROgFY4EdqI9sTOt2pjHw"] = ["Architect","openup_basic/capabilitypatterns/architect,_qQROgFY4EdqI9sTOt2pjHw.html"];
elementUrls["_d4GesL-FEdqb7N6KIeDL8Q"] = ["Run Developer Tests","openup_basic/capabilitypatterns/run_developer_tests,_d4GesL-FEdqb7N6KIeDL8Q.html"];
elementUrls["_MWLqQk9HEdudU75l2xOQTw"] = ["Architecture","openup_basic/capabilitypatterns/architecture,_MWLqQk9HEdudU75l2xOQTw.html"];
elementUrls["_0sTaYMlgEdmt3adZL5Dmdw"] = ["Elaboration Phase Iteration","openup_basic/capabilitypatterns/elaboration_phase_iteration,_0sTaYMlgEdmt3adZL5Dmdw.html"];
elementUrls["_y1uwgBOKEduCNqgZdt_OaA"] = ["Lifecycle Objectives Milestone","openup_basic/deliveryprocesses/lifecycle_objectives,_y1uwgBOKEduCNqgZdt_OaA.html"];
elementUrls["_SZOIoEmSEduO0bs89Khm8Q"] = ["Architecture","openup_basic/capabilitypatterns/architecture,_SZOIoEmSEduO0bs89Khm8Q.html"];
elementUrls["_qQjiYFY4EdqI9sTOt2pjHw"] = ["Design","openup_basic/capabilitypatterns/design,_qQjiYFY4EdqI9sTOt2pjHw.html"];
elementUrls["_eFeO00bpEduLBN1xMBngqw"] = ["Use-Case Model","openup_basic/capabilitypatterns/uc_model,_eFeO00bpEduLBN1xMBngqw.html"];
elementUrls["_MWFjp09HEdudU75l2xOQTw"] = ["Build","openup_basic/capabilitypatterns/build,_MWFjp09HEdudU75l2xOQTw.html"];
elementUrls["_0q33AclgEdmt3adZL5Dmdw"] = ["Manage Iteration","openup_basic/capabilitypatterns/manage_iteration,_0q33AclgEdmt3adZL5Dmdw.html"];
elementUrls["_0rcewclgEdmt3adZL5Dmdw"] = ["Define the Architecture","openup_basic/capabilitypatterns/define_architecture,_0rcewclgEdmt3adZL5Dmdw.html"];
elementUrls["_Y5DAML-EEdqb7N6KIeDL8Q"] = ["Work Items List","openup_basic/capabilitypatterns/work_items_list,_Y5DAML-EEdqb7N6KIeDL8Q.html"];
elementUrls["_g2XAwheDEduXJrZWmtC8tg"] = ["Glossary","openup_basic/capabilitypatterns/glossary,_g2XAwheDEduXJrZWmtC8tg.html"];
elementUrls["_0oreoclgEdmt3adZL5Dmdw"] = ["Determine Architectural Feasibility","openup_basic/capabilitypatterns/determine_architectural_feasibility,_0oreoclgEdmt3adZL5Dmdw.html"];
elementUrls["_eFeO0UbpEduLBN1xMBngqw"] = ["Use Case","openup_basic/capabilitypatterns/use_case,_eFeO0UbpEduLBN1xMBngqw.html"];
elementUrls["_Y42y8L-EEdqb7N6KIeDL8Q"] = ["Find and Outline Requirements","openup_basic/capabilitypatterns/find_and_outline_requirements,_Y42y8L-EEdqb7N6KIeDL8Q.html"];
elementUrls["_DT8oBTk-EduFTqg5hiiQIw"] = ["Stakeholder","openup_basic/capabilitypatterns/stakeholder,_DT8oBTk-EduFTqg5hiiQIw.html"];
elementUrls["_eFeO0EbpEduLBN1xMBngqw"] = ["Analyst","openup_basic/capabilitypatterns/analyst,_eFeO0EbpEduLBN1xMBngqw.html"];
elementUrls["_467NIhOKEduCNqgZdt_OaA"] = ["Transition Iteration [1..n]","openup_basic/deliveryprocesses/transition_phase_iteration,_467NIhOKEduCNqgZdt_OaA.html"];
elementUrls["_0rilYclgEdmt3adZL5Dmdw"] = ["Validate Build","openup_basic/capabilitypatterns/validate_build,_0rilYclgEdmt3adZL5Dmdw.html"];
elementUrls["_VZk0YxeDEduXJrZWmtC8tg"] = ["Glossary","openup_basic/capabilitypatterns/glossary,_VZk0YxeDEduXJrZWmtC8tg.html"];
elementUrls["_eGoFYkbpEduLBN1xMBngqw"] = ["Find and Outline Requirements","openup_basic/capabilitypatterns/find_and_outline_requirements,_eGoFYkbpEduLBN1xMBngqw.html"];
elementUrls["_SZICAEmSEduO0bs89Khm8Q"] = ["Plan Iteration","openup_basic/capabilitypatterns/plan_iteration,_SZICAEmSEduO0bs89Khm8Q.html"];
elementUrls["_MWLqRE9HEdudU75l2xOQTw"] = ["Implement the Solution","openup_basic/capabilitypatterns/implement_solution,_MWLqRE9HEdudU75l2xOQTw.html"];
elementUrls["_DT8oAjk-EduFTqg5hiiQIw"] = ["Tester","openup_basic/capabilitypatterns/tester,_DT8oAjk-EduFTqg5hiiQIw.html"];
elementUrls["_WrXvwPinEdmugcVr9AdHjQ"] = ["Develop Solution (for requirement) (within context)","openup_basic/capabilitypatterns/develop_requirement_within_context,_WrXvwPinEdmugcVr9AdHjQ.html"];
elementUrls["_d5-nQFY4EdqI9sTOt2pjHw"] = ["Architect","openup_basic/capabilitypatterns/architect,_d5-nQFY4EdqI9sTOt2pjHw.html"];
elementUrls["_RfwvEDOvEduqsLmIADMQ9g"] = ["Test Script","openup_basic/capabilitypatterns/test_script,_RfwvEDOvEduqsLmIADMQ9g.html"];
elementUrls["_DT8oATk-EduFTqg5hiiQIw"] = ["Architect","openup_basic/capabilitypatterns/architect,_DT8oATk-EduFTqg5hiiQIw.html"];
elementUrls["_-5MmMDL2EdueZPye-FaNgA"] = ["Project Manager","openup_basic/capabilitypatterns/project_manager,_-5MmMDL2EdueZPye-FaNgA.html"];
elementUrls["_DT8oAzk-EduFTqg5hiiQIw"] = ["Developer","openup_basic/capabilitypatterns/developer,_DT8oAzk-EduFTqg5hiiQIw.html"];
elementUrls["_wG28gFY6EdqI9sTOt2pjHw"] = ["Use-Case Model","openup_basic/capabilitypatterns/uc_model,_wG28gFY6EdqI9sTOt2pjHw.html"];
elementUrls["_mZVjwFY5EdqI9sTOt2pjHw"] = ["Iteration Plan","openup_basic/capabilitypatterns/iteration_plan,_mZVjwFY5EdqI9sTOt2pjHw.html"];
elementUrls["_wGw14FY6EdqI9sTOt2pjHw"] = ["Vision","openup_basic/capabilitypatterns/vision,_wGw14FY6EdqI9sTOt2pjHw.html"];
elementUrls["_0pWNA8lgEdmt3adZL5Dmdw"] = ["Initiate Project","openup_basic/capabilitypatterns/initiate_project,_0pWNA8lgEdmt3adZL5Dmdw.html"];
elementUrls["_QN4E4ALlEduHjPEP_YPH-g"] = ["Use Case","openup_basic/capabilitypatterns/use_case,_QN4E4ALlEduHjPEP_YPH-g.html"];
elementUrls["_MWLqRk9HEdudU75l2xOQTw"] = ["Test Log","openup_basic/capabilitypatterns/test_log,_MWLqRk9HEdudU75l2xOQTw.html"];
elementUrls["_MWLqQU9HEdudU75l2xOQTw"] = ["Supporting Requirements","openup_basic/capabilitypatterns/supporting_requirements,_MWLqQU9HEdudU75l2xOQTw.html"];
elementUrls["_kFwgIDbsEduMn613sF6-Uw"] = ["Create Test Cases","openup_basic/capabilitypatterns/create_test_case,_kFwgIDbsEduMn613sF6-Uw.html"];
elementUrls["_-uRRkE_fEduE1dJ2XtzzkQ"] = ["Analyst","openup_basic/capabilitypatterns/analyst,_-uRRkE_fEduE1dJ2XtzzkQ.html"];
elementUrls["_0uyGoMlgEdmt3adZL5Dmdw"] = ["OpenUP/Basic Lifecycle","openup_basic/deliveryprocesses/openup_basic_process,_0uyGoMlgEdmt3adZL5Dmdw.html"];
elementUrls["_16nd0BOKEduCNqgZdt_OaA"] = ["Lifecycle Architecture Milestone","openup_basic/deliveryprocesses/lifecycle_architecture,_16nd0BOKEduCNqgZdt_OaA.html"];
elementUrls["_MWFjo09HEdudU75l2xOQTw"] = ["Developer","openup_basic/capabilitypatterns/developer,_MWFjo09HEdudU75l2xOQTw.html"];
elementUrls["_a6qBUFY2EdqI9sTOt2pjHw"] = ["Tester","openup_basic/capabilitypatterns/tester,_a6qBUFY2EdqI9sTOt2pjHw.html"];
elementUrls["_-uRRkk_fEduE1dJ2XtzzkQ"] = ["Tester","openup_basic/capabilitypatterns/tester,_-uRRkk_fEduE1dJ2XtzzkQ.html"];
elementUrls["_qQ12QFY4EdqI9sTOt2pjHw"] = ["Architectural Proof-of-Concept","openup_basic/capabilitypatterns/arch_poc,_qQ12QFY4EdqI9sTOt2pjHw.html"];
elementUrls["_y_PjTOtQEdqc1LGhiSPqRg"] = ["Ongoing Tasks","openup_basic/capabilitypatterns/ongoing_tasks,_y_PjTOtQEdqc1LGhiSPqRg.html"];
elementUrls["_cnzUcL-FEdqb7N6KIeDL8Q"] = ["Implement Developer Tests","openup_basic/capabilitypatterns/impl_developer_tests,_cnzUcL-FEdqb7N6KIeDL8Q.html"];
elementUrls["_oNnk0FY5EdqI9sTOt2pjHw"] = ["Work Items List","openup_basic/capabilitypatterns/work_items_list,_oNnk0FY5EdqI9sTOt2pjHw.html"];
elementUrls["_0okw8clgEdmt3adZL5Dmdw"] = ["Manage Requirements","openup_basic/capabilitypatterns/manage_requirements,_0okw8clgEdmt3adZL5Dmdw.html"];
elementUrls["_eE5nEUbpEduLBN1xMBngqw"] = ["Manage Requirements","openup_basic/capabilitypatterns/manage_requirements,_eE5nEUbpEduLBN1xMBngqw.html"];
elementUrls["_uknUwb-EEdqb7N6KIeDL8Q"] = ["Design","openup_basic/capabilitypatterns/design,_uknUwb-EEdqb7N6KIeDL8Q.html"];
elementUrls["_iJwqcDLvEdueZPye-FaNgA"] = ["Develop the Architecture","openup_basic/capabilitypatterns/develop_arch,_iJwqcDLvEdueZPye-FaNgA.html"];
elementUrls["_4Y1wML3JEdqfrv3k16plXw"] = ["Work Items List","openup_basic/capabilitypatterns/work_items_list,_4Y1wML3JEdqfrv3k16plXw.html"];
elementUrls["_0nz79clgEdmt3adZL5Dmdw"] = ["Test","openup_basic/capabilitypatterns/test,_0nz79clgEdmt3adZL5Dmdw.html"];
elementUrls["_cMHeAL-FEdqb7N6KIeDL8Q"] = ["Supporting Requirements","openup_basic/capabilitypatterns/supporting_requirements,_cMHeAL-FEdqb7N6KIeDL8Q.html"];
elementUrls["_S8dNQsBFEdqSgKaj2SZBmg"] = ["Tester","openup_basic/capabilitypatterns/tester,_S8dNQsBFEdqSgKaj2SZBmg.html"];
elementUrls["_cMHeAb-FEdqb7N6KIeDL8Q"] = ["Architecture","openup_basic/capabilitypatterns/architecture,_cMHeAb-FEdqb7N6KIeDL8Q.html"];
elementUrls["_XKbwoFY5EdqI9sTOt2pjHw"] = ["Project Plan","openup_basic/capabilitypatterns/project_plan,_XKbwoFY5EdqI9sTOt2pjHw.html"];
elementUrls["_5M7icFY1EdqI9sTOt2pjHw"] = ["Work Items List","openup_basic/capabilitypatterns/work_items_list,_5M7icFY1EdqI9sTOt2pjHw.html"];
elementUrls["_DT8oADk-EduFTqg5hiiQIw"] = ["Analyst","openup_basic/capabilitypatterns/analyst,_DT8oADk-EduFTqg5hiiQIw.html"];
elementUrls["_oNJDsFY5EdqI9sTOt2pjHw"] = ["Manage Iteration","openup_basic/capabilitypatterns/manage_iteration,_oNJDsFY5EdqI9sTOt2pjHw.html"];
elementUrls["_nykLZL3SEdqfrv3k16plXw"] = ["Implement Tests","openup_basic/capabilitypatterns/implement_tests,_nykLZL3SEdqfrv3k16plXw.html"];
elementUrls["_9kUSEFY4EdqI9sTOt2pjHw"] = ["Developer","openup_basic/capabilitypatterns/developer,_9kUSEFY4EdqI9sTOt2pjHw.html"];
elementUrls["_r1QxIDeqEduCsbgJNeFsSw"] = ["Project Manager","openup_basic/capabilitypatterns/project_manager,_r1QxIDeqEduCsbgJNeFsSw.html"];
elementUrls["_BmbHQU_cEduE1dJ2XtzzkQ"] = ["Tester","openup_basic/capabilitypatterns/tester,_BmbHQU_cEduE1dJ2XtzzkQ.html"];
elementUrls["_VNvacFY5EdqI9sTOt2pjHw"] = ["Vision","openup_basic/capabilitypatterns/vision,_VNvacFY5EdqI9sTOt2pjHw.html"];
elementUrls["_0nJNkslgEdmt3adZL5Dmdw"] = ["Plan and Manage Iteration","openup_basic/capabilitypatterns/manage_iteration,_0nJNkslgEdmt3adZL5Dmdw.html"];
elementUrls["_4dgQAL-FEdqb7N6KIeDL8Q"] = ["Actor","openup_basic/capabilitypatterns/actor,_4dgQAL-FEdqb7N6KIeDL8Q.html"];
elementUrls["_0rQRgMlgEdmt3adZL5Dmdw"] = ["Transition Phase Iteration","openup_basic/capabilitypatterns/transition_phase_iteration,_0rQRgMlgEdmt3adZL5Dmdw.html"];
elementUrls["_MWLqTU9HEdudU75l2xOQTw"] = ["Test Script","openup_basic/capabilitypatterns/test_script,_MWLqTU9HEdudU75l2xOQTw.html"];
elementUrls["_y-3IrutQEdqc1LGhiSPqRg"] = ["Construction Phase Iteration","openup_basic/capabilitypatterns/construction_phase_iteration,_y-3IrutQEdqc1LGhiSPqRg.html"];
elementUrls["_-YrHMFY4EdqI9sTOt2pjHw"] = ["Implementation","openup_basic/capabilitypatterns/implementation,_-YrHMFY4EdqI9sTOt2pjHw.html"];
elementUrls["_rQ9xIMjkEdqIm8AJUZUQYg"] = ["Architect","openup_basic/capabilitypatterns/architect,_rQ9xIMjkEdqIm8AJUZUQYg.html"];
elementUrls["_9k_AcFY4EdqI9sTOt2pjHw"] = ["Design","openup_basic/capabilitypatterns/design,_9k_AcFY4EdqI9sTOt2pjHw.html"];
elementUrls["_MWFjoU9HEdudU75l2xOQTw"] = ["Develop Solution (for requirement) (within context)","openup_basic/capabilitypatterns/develop_solution,_MWFjoU9HEdudU75l2xOQTw.html"];
elementUrls["_mZt-QFY5EdqI9sTOt2pjHw"] = ["Project Plan","openup_basic/capabilitypatterns/project_plan,_mZt-QFY5EdqI9sTOt2pjHw.html"];
elementUrls["_TAVx0CliEdqjQsaFX0CJTw"] = ["Ongoing Tasks","openup_basic/capabilitypatterns/ongoing_tasks,_TAVx0CliEdqjQsaFX0CJTw.html"];
elementUrls["_eGoFZEbpEduLBN1xMBngqw"] = ["Supporting Requirements","openup_basic/capabilitypatterns/supporting_requirements,_eGoFZEbpEduLBN1xMBngqw.html"];
elementUrls["_ezOKIU9DEdudU75l2xOQTw"] = ["Stakeholder","openup_basic/capabilitypatterns/stakeholder,_ezOKIU9DEdudU75l2xOQTw.html"];
elementUrls["_86w-oOB4EdqnKu908IEluw"] = ["Glossary","openup_basic/capabilitypatterns/glossary,_86w-oOB4EdqnKu908IEluw.html"];
elementUrls["_VZk0ZBeDEduXJrZWmtC8tg"] = ["Vision","openup_basic/capabilitypatterns/vision,_VZk0ZBeDEduXJrZWmtC8tg.html"];
elementUrls["_iJ2xFDLvEdueZPye-FaNgA"] = ["Architectural Proof-of-Concept","openup_basic/capabilitypatterns/arch_poc,_iJ2xFDLvEdueZPye-FaNgA.html"];
elementUrls["_MWLqRU9HEdudU75l2xOQTw"] = ["Run Developer Tests","openup_basic/capabilitypatterns/run_developer_tests,_MWLqRU9HEdudU75l2xOQTw.html"];
elementUrls["_oR39mb3SEdqfrv3k16plXw"] = ["Run Tests","openup_basic/capabilitypatterns/run_tests,_oR39mb3SEdqfrv3k16plXw.html"];
elementUrls["_kF8tYTbsEduMn613sF6-Uw"] = ["Test Case","openup_basic/capabilitypatterns/test_case,_kF8tYTbsEduMn613sF6-Uw.html"];
elementUrls["_MWLqQE9HEdudU75l2xOQTw"] = ["Design the Solution","openup_basic/capabilitypatterns/design_solution,_MWLqQE9HEdudU75l2xOQTw.html"];
elementUrls["_HTBBMU_dEduE1dJ2XtzzkQ"] = ["Developer","openup_basic/capabilitypatterns/developer,_HTBBMU_dEduE1dJ2XtzzkQ.html"];
elementUrls["_DT8oBDk-EduFTqg5hiiQIw"] = ["Any Role","openup_basic/capabilitypatterns/any_role,_DT8oBDk-EduFTqg5hiiQIw.html"];
elementUrls["_mKUB8L-EEdqb7N6KIeDL8Q"] = ["Demonstrate the Architecture","openup_basic/capabilitypatterns/demonstrate_architecture,_mKUB8L-EEdqb7N6KIeDL8Q.html"];
elementUrls["_lqbA8L-EEdqb7N6KIeDL8Q"] = ["Supporting Requirements","openup_basic/capabilitypatterns/supporting_requirements,_lqbA8L-EEdqb7N6KIeDL8Q.html"];
elementUrls["_S8dNQMBFEdqSgKaj2SZBmg"] = ["Architect","openup_basic/capabilitypatterns/architect,_S8dNQMBFEdqSgKaj2SZBmg.html"];
elementUrls["_0qrpwslgEdmt3adZL5Dmdw"] = ["Validate Build","openup_basic/capabilitypatterns/validate_build,_0qrpwslgEdmt3adZL5Dmdw.html"];
elementUrls["_r1Xe0DeqEduCsbgJNeFsSw"] = ["Use Case Model","openup_basic/capabilitypatterns/uc_model,_r1Xe0DeqEduCsbgJNeFsSw.html"];
elementUrls["_-uRRkU_fEduE1dJ2XtzzkQ"] = ["Stakeholder","openup_basic/capabilitypatterns/stakeholder,_-uRRkU_fEduE1dJ2XtzzkQ.html"];
elementUrls["_eHAf4UbpEduLBN1xMBngqw"] = ["Tester","openup_basic/capabilitypatterns/tester,_eHAf4UbpEduLBN1xMBngqw.html"];
elementUrls["_PJJ3A0_dEduE1dJ2XtzzkQ"] = ["Project Manager","openup_basic/capabilitypatterns/project_manager,_PJJ3A0_dEduE1dJ2XtzzkQ.html"];
elementUrls["_PJJ3AU_dEduE1dJ2XtzzkQ"] = ["Stakeholder","openup_basic/capabilitypatterns/stakeholder,_PJJ3AU_dEduE1dJ2XtzzkQ.html"];
elementUrls["_eGuMB0bpEduLBN1xMBngqw"] = ["Stakeholder","openup_basic/capabilitypatterns/stakeholder,_eGuMB0bpEduLBN1xMBngqw.html"];
elementUrls["_eHAf4EbpEduLBN1xMBngqw"] = ["Create Test Cases","openup_basic/capabilitypatterns/create_test_case,_eHAf4EbpEduLBN1xMBngqw.html"];
elementUrls["_2tHGoMAYEdqX-s4mWhkyqQ"] = ["Stakeholder","openup_basic/capabilitypatterns/stakeholder,_2tHGoMAYEdqX-s4mWhkyqQ.html"];
elementUrls["_h2-iAfimEdmugcVr9AdHjQ"] = ["Develop Solution (for requirement) (within context)","openup_basic/capabilitypatterns/develop_solution,_h2-iAfimEdmugcVr9AdHjQ.html"];
elementUrls["_XKVqAFY5EdqI9sTOt2pjHw"] = ["Project Manager","openup_basic/capabilitypatterns/project_manager,_XKVqAFY5EdqI9sTOt2pjHw.html"];
elementUrls["_eGoFY0bpEduLBN1xMBngqw"] = ["Work Items List","openup_basic/capabilitypatterns/work_items_list,_eGoFY0bpEduLBN1xMBngqw.html"];
elementUrls["_MWLqTE9HEdudU75l2xOQTw"] = ["Project Manager","openup_basic/capabilitypatterns/project_manager,_MWLqTE9HEdudU75l2xOQTw.html"];
elementUrls["_0qxwYclgEdmt3adZL5Dmdw"] = ["Ongoing Tasks","openup_basic/capabilitypatterns/ongoing_tasks,_0qxwYclgEdmt3adZL5Dmdw.html"];
elementUrls["_hhnXEDeqEduCsbgJNeFsSw"] = ["Risk List","openup_basic/capabilitypatterns/risk_list,_hhnXEDeqEduCsbgJNeFsSw.html"];
elementUrls["_uknUwL-EEdqb7N6KIeDL8Q"] = ["Supporting Requirements","openup_basic/capabilitypatterns/supporting_requirements,_uknUwL-EEdqb7N6KIeDL8Q.html"];
elementUrls["_0o9ygclgEdmt3adZL5Dmdw"] = ["Manage Requirements","openup_basic/capabilitypatterns/manage_requirements,_0o9ygclgEdmt3adZL5Dmdw.html"];
elementUrls["_MWLqR09HEdudU75l2xOQTw"] = ["Architect","openup_basic/capabilitypatterns/architect,_MWLqR09HEdudU75l2xOQTw.html"];
elementUrls["_eGuMBUbpEduLBN1xMBngqw"] = ["Detail Requirements","openup_basic/capabilitypatterns/detail_requirements,_eGuMBUbpEduLBN1xMBngqw.html"];
elementUrls["_a_F1YFY2EdqI9sTOt2pjHw"] = ["Test Script","openup_basic/capabilitypatterns/test_script,_a_F1YFY2EdqI9sTOt2pjHw.html"];
elementUrls["_xupMvxOKEduCNqgZdt_OaA"] = ["Inception Iteration [1..n]","openup_basic/deliveryprocesses/inception_phase_iteration,_xupMvxOKEduCNqgZdt_OaA.html"];
elementUrls["_VNpT0FY5EdqI9sTOt2pjHw"] = ["Analyst","openup_basic/capabilitypatterns/analyst,_VNpT0FY5EdqI9sTOt2pjHw.html"];
elementUrls["_kF8tYDbsEduMn613sF6-Uw"] = ["Tester","openup_basic/capabilitypatterns/tester,_kF8tYDbsEduMn613sF6-Uw.html"];
elementUrls["_MWFjpk9HEdudU75l2xOQTw"] = ["Developer Test","openup_basic/capabilitypatterns/developer_test,_MWFjpk9HEdudU75l2xOQTw.html"];
elementUrls["_eFeO0kbpEduLBN1xMBngqw"] = ["Vision","openup_basic/capabilitypatterns/vision,_eFeO0kbpEduLBN1xMBngqw.html"];
elementUrls["_0DMlYPinEdmugcVr9AdHjQ"] = ["Develop Solution (for requirement) (within context)","openup_basic/capabilitypatterns/develop_requirement_within_context,_0DMlYPinEdmugcVr9AdHjQ.html"];
elementUrls["_y-3IretQEdqc1LGhiSPqRg"] = ["Validate Build","openup_basic/capabilitypatterns/validate_build,_y-3IretQEdqc1LGhiSPqRg.html"];
elementUrls["_0sx7islgEdmt3adZL5Dmdw"] = ["Define the Architecture","openup_basic/capabilitypatterns/define_architecture,_0sx7islgEdmt3adZL5Dmdw.html"];
elementUrls["_MWFjpU9HEdudU75l2xOQTw"] = ["Implementation","openup_basic/capabilitypatterns/implementation,_MWFjpU9HEdudU75l2xOQTw.html"];
elementUrls["_-Y3UcFY4EdqI9sTOt2pjHw"] = ["Developer Test","openup_basic/capabilitypatterns/developer_test,_-Y3UcFY4EdqI9sTOt2pjHw.html"];
elementUrls["_dAoEIL-FEdqb7N6KIeDL8Q"] = ["Implement the Solution","openup_basic/capabilitypatterns/implement_solution,_dAoEIL-FEdqb7N6KIeDL8Q.html"];
elementUrls["_PFnTkOB7EdqnKu908IEluw"] = ["Glossary","openup_basic/capabilitypatterns/glossary,_PFnTkOB7EdqnKu908IEluw.html"];
elementUrls["_3CqrAROKEduCNqgZdt_OaA"] = ["Construction Iteration [1..n]","openup_basic/deliveryprocesses/construction_phase_iteration,_3CqrAROKEduCNqgZdt_OaA.html"];
elementUrls["_ny2fQL3SEdqfrv3k16plXw"] = ["Build","openup_basic/capabilitypatterns/build,_ny2fQL3SEdqfrv3k16plXw.html"];
elementUrls["_qQppAFY4EdqI9sTOt2pjHw"] = ["Architecture","openup_basic/capabilitypatterns/architecture,_qQppAFY4EdqI9sTOt2pjHw.html"];
elementUrls["_DUCuoDk-EduFTqg5hiiQIw"] = ["Risk List","openup_basic/capabilitypatterns/risk_list,_DUCuoDk-EduFTqg5hiiQIw.html"];
elementUrls["_MWLqSU9HEdudU75l2xOQTw"] = ["Develop the Architecture","openup_basic/capabilitypatterns/develop_arch,_MWLqSU9HEdudU75l2xOQTw.html"];
elementUrls["_0rWYIslgEdmt3adZL5Dmdw"] = ["Manage Iteration","openup_basic/capabilitypatterns/manage_iteration,_0rWYIslgEdmt3adZL5Dmdw.html"];
elementUrls["_0Spa4BOKEduCNqgZdt_OaA"] = ["Elaboration Iteration [1..n]","openup_basic/deliveryprocesses/elaboration_phase_iteration,_0Spa4BOKEduCNqgZdt_OaA.html"];
elementUrls["_SZOIoUmSEduO0bs89Khm8Q"] = ["Vision","openup_basic/capabilitypatterns/vision,_SZOIoUmSEduO0bs89Khm8Q.html"];
elementUrls["_d4k_0L-FEdqb7N6KIeDL8Q"] = ["Test Log","openup_basic/capabilitypatterns/test_log,_d4k_0L-FEdqb7N6KIeDL8Q.html"];
elementUrls["_qoEDcFY4EdqI9sTOt2pjHw"] = ["Developer","openup_basic/capabilitypatterns/developer,_qoEDcFY4EdqI9sTOt2pjHw.html"];
elementUrls["_eHAf4kbpEduLBN1xMBngqw"] = ["Test Case","openup_basic/capabilitypatterns/test_case,_eHAf4kbpEduLBN1xMBngqw.html"];
elementUrls["_cL1KIL-FEdqb7N6KIeDL8Q"] = ["Design the Solution","openup_basic/capabilitypatterns/design_solution,_cL1KIL-FEdqb7N6KIeDL8Q.html"];
elementUrls["_0ruyoclgEdmt3adZL5Dmdw"] = ["Manage Requirements","openup_basic/capabilitypatterns/manage_requirements,_0ruyoclgEdmt3adZL5Dmdw.html"];
elementUrls["_mKmV0L-EEdqb7N6KIeDL8Q"] = ["Vision","openup_basic/capabilitypatterns/vision,_mKmV0L-EEdqb7N6KIeDL8Q.html"];
elementUrls["_J8-00MAZEdqX-s4mWhkyqQ"] = ["Stakeholder","openup_basic/capabilitypatterns/stakeholder,_J8-00MAZEdqX-s4mWhkyqQ.html"];
elementUrls["_PJJ3Ak_dEduE1dJ2XtzzkQ"] = ["Tester","openup_basic/capabilitypatterns/tester,_PJJ3Ak_dEduE1dJ2XtzzkQ.html"];
elementUrls["_jLaKwP77Edm1zMZYtD3GjA"] = ["Manage Iteration","openup_basic/capabilitypatterns/manage_iteration,_jLaKwP77Edm1zMZYtD3GjA.html"];
elementUrls["_TPsdoUmSEduO0bs89Khm8Q"] = ["Status Assessment","openup_basic/capabilitypatterns/status_assessment,_TPsdoUmSEduO0bs89Khm8Q.html"];
elementUrls["_HTpzcDSLEdursMWmT1aZyw"] = ["Use Case Model","openup_basic/capabilitypatterns/uc_model,_HTpzcDSLEdursMWmT1aZyw.html"];
elementUrls["_a8fNUFY2EdqI9sTOt2pjHw"] = ["Test Case","openup_basic/capabilitypatterns/test_case,_a8fNUFY2EdqI9sTOt2pjHw.html"];
