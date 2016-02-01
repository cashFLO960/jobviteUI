
// create table

var aggregateScreenerData = function(name, results, view) {
    
        results.length;

        var numNew = 0;
        var numAccepted = 0;

        for (var i = 0; i < results.length; i++) {
            var candidate = results[i];
            switch (candidate.workflowState) {
                case 'New':
                    numNew++;
                    break;
                case 'Interviewed':
                    numAccepted++;
                    break;
                case 'Offer Accepted':
                    numAccepted++;
                    break;
                default:
                    break;
            }
        }
        
        view.addRow(name, numNew, 0, 0, numAccepted);

};


function MetricsControlView(parentElement) {
    var container = document.createElement('section');

    var startDate = document.createElement("INPUT");
    startDate.setAttribute("type", "date");
    container.appendChild(startDate);

    var endDate = document.createElement("INPUT");
    endDate.setAttribute("type", "date");
    container.appendChild(endDate);

    parentElement.appendChild(container);
}















