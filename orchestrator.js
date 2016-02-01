
window.onload = function () {
	//generateCoordinatorTable();
	dateFilter();
	//generateSourcerTable();
	//generateScreenerTable();
	//generateRecruiterTable();
    //generateTotalScoreTable();
};

var generateHiringTable = function(startDate, endDate) {

	var hiringManagers = [
	'enter names here'

	]

	var workflowStates = [
	        'New',
            //'Resume Screen',
            //'Online Application',
            //'Recruiter Screen',
            'Recruiter Screen Completed',
            //'Recruiter Screen No Show',
            //'1st Round Interview',
            '1st Round Interview Completed',
            //'1st Round Interview - No Show',
            //'Background Check',
            //'Verbal Offer Extended',
            //'Onboarding',
            //'Offer Generation',
            //'Offer Sent',
            'Offer Accepted',
            'Offer Rejected',
            //'Reject',
            //'No Call No Show'
	]

	generateTable('customFields.Hiring Manager', hiringManagers, workflowStates, startDate, endDate, 'table1', createNonTotalsQuery);

}




var generateRecruiterTable = function(startDate, endDate) {

	var recruiters = [
		'enter names here'

	]

	var workflowStates = [
	        'New',
            //'Resume Screen',
            //'Online Application',
            //'Recruiter Screen',
            'Recruiter Screen Completed',
            //'Recruiter Screen No Show',
            //'1st Round Interview',
            '1st Round Interview Completed',
            //'1st Round Interview - No Show',
            //'Background Check',
            //'Verbal Offer Extended',
            //'Onboarding',
            //'Offer Generation',
            //'Offer Sent',
            'Offer Accepted',
            'Offer Rejected',
            //'Reject',
            //'No Call No Show'
	]

	generateTable('customFields.Recruiter', recruiters, workflowStates, startDate, endDate, 'table1', createNonTotalsQuery);

}


var generateSourcerTable = function(startDate, endDate) {

	var sourcers = [
		'enter names here'
	]

	var workflowStates = [
	          'New',
            //'Resume Screen',
            //'Online Application',
            //'Recruiter Screen',
            'Recruiter Screen Completed',
            //'Recruiter Screen No Show',
            //'1st Round Interview',
            '1st Round Interview Completed',
            //'1st Round Interview - No Show',
            //'Background Check',
            //'Verbal Offer Extended',
            //'Onboarding',
            //'Offer Generation',
            //'Offer Sent',
            'Offer Accepted',
            'Offer Rejected',
            //'Reject',
            //'No Call No Show'
	]

	generateTable('customFields.Sourcer', sourcers, workflowStates, startDate, endDate, 'table1', createNonTotalsQuery);

}

var generateScreenerTable = function(startDate, endDate) {

	var screeners = [
	'enter names here'
	]

	var workflowStates = [
	         'New',
            //'Resume Screen',
            //'Online Application',
            //'Recruiter Screen',
            'Recruiter Screen Completed',
            //'Recruiter Screen No Show',
            //'1st Round Interview',
            '1st Round Interview Completed',
            //'1st Round Interview - No Show',
            //'Background Check',
            //'Verbal Offer Extended',
            //'Onboarding',
            //'Offer Generation',
            //'Offer Sent',
            'Offer Accepted',
            'Offer Rejected',
            //'Reject',
            //'No Call No Show'
	]

	generateTable('customFields.Screener', screeners, workflowStates, startDate, endDate, 'table1', createNonTotalsQuery);

}

var generateTotalsTable = function(startDate, endDate) {

	var recruiters = [
		'enter names here'

	]

	var workflowStates = [
            'Offer Accepted',
			//'Resume Screen',
			//'Recruiter Screen',
            //'Recruiter Screen Completed',
	]

	generateTable('Totals', recruiters, workflowStates, startDate, endDate, 'table1', createTotalsQuery);

}




var createNonTotalsQuery = function(fieldName, entity, state, startDate, endDate) {
	var queryObject = {};
	queryObject['accessTimestamp'] = {
		$gte: startDate,
		$lte: endDate
	};
	queryObject['workflowState'] = state;
	queryObject[fieldName] = entity;
	return queryObject;
}

var createTotalsQuery = function(fieldName, entity, state, startDate, endDate) {
	return {
		$or: [{"customFields.Screener":entity},{"customFields.Sourcer":entity},{"customFields.Recruiter":entity}],
		workflowState: state,
		accessTimestamp: {$gte: startDate, $lte: endDate}
	};
}

var Tables = [];





var generateTable = function(fieldName, fieldsArray, workflowStates, startDate, endDate, tableClass, queryFunction) {
	var existingTable = Tables[fieldName];
	if(existingTable) {
		existingTable.detach();
	}

	var scorecard1 = new DataTableView(document.body, tableClass, workflowStates, fieldName);
	Tables[fieldName] = scorecard1;

	for(var x = 0; x < fieldsArray.length; x++) {
		var row = fieldsArray[x];
		scorecard1.createRow(row);
	}

	for(var x = 0; x < fieldsArray.length; x++) {
		for(var i = 0; i < workflowStates.length; i++) {
		(function (){
			var entity = fieldsArray[x];
			var state = workflowStates[i];
			var queryObject = queryFunction(fieldName, entity, state, startDate, endDate)
			getCount(queryObject, function (count) {
				scorecard1.setCell(entity, state, count);
			});
		})();
		}
	}
}

var dateFilter = function(){

	var startDate = document.createElement("input");
	startDate.type = "date";
	document.body.appendChild(startDate);

	var endDate = document.createElement("input");
	endDate.type = "date";
	document.body.appendChild(endDate);

    var updateFunction = function (){

		var today = new Date();
		var startDateInput;

		if(startDate.value) {
			startDateInput = startDate.valueAsDate;
		} else {
			startDateInput = today;
		}

		var endDateInput;
		if(endDate.value) {
			endDateInput = endDate.valueAsDate;
		} else {
			endDateInput = today;
		}

		if(startDateInput !== endDateInput) {
            //generateTotalsTable(startDateInput, endDateInput);
            generateSourcerTable(startDateInput, endDateInput);
			generateScreenerTable(startDateInput, endDateInput);
			generateRecruiterTable(startDateInput, endDateInput);
             generateHiringTable(startDateInput,endDateInput);

		}

	};

	startDate.onchange = updateFunction;
	endDate.onchange = updateFunction;


};
