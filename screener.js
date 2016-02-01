
function ScreenerScoreView(parentElement, className) {
    this.container = document.createElement('table');
    this.container.classList.add(className);

    var headerRow = document.createElement("tr");
    var hr = ['Candidates', 'Screened', 'Candidates Interviewed/Screened', 'Candidates Offered/Interviewed', 'Candidates Accepted'];
    for (var i = 0; i < hr.length; i++) {
        var headerCell = document.createElement("th");
        headerCell.innerHTML = hr[i];
        headerRow.appendChild(headerCell);
    }

    this.container.appendChild(headerRow);

    parentElement.appendChild(this.container);
}
ScreenerScoreView.prototype.addRow = function (name, screened, interviewed, offered, accepted) {
    var itemView = new ScreenerScoreItemView(this.container);
    itemView.setCandidates(name);
    itemView.setScreened(screened);
    itemView.setInterviewed(interviewed);
    itemView.setOffered(offered);
    itemView.setAccepted(accepted);

};

function ScreenerScoreItemView(parentElement) {
    var container = document.createElement("tr");

    this.candidatesCell = document.createElement('td');
    this.screenedCell = document.createElement('td');
    this.interviewedCell = document.createElement('td');
    this.offeredCell = document.createElement('td');
    this.acceptedCell = document.createElement('td');

    container.appendChild(this.candidatesCell);
    container.appendChild(this.screenedCell);
    container.appendChild(this.interviewedCell);
    container.appendChild(this.offeredCell);
    container.appendChild(this.acceptedCell);

    parentElement.appendChild(container);
}
ScreenerScoreItemView.prototype.setCandidates = function (num) {
    this.candidatesCell.innerHTML = num;
};
ScreenerScoreItemView.prototype.setScreened = function (num) {
    this.screenedCell.innerHTML = num;
};
ScreenerScoreItemView.prototype.setInterviewed = function (num) {
    this.interviewedCell.innerHTML = num;
};
ScreenerScoreItemView.prototype.setOffered = function (num) {
    this.offeredCell.innerHTML = num;
};
ScreenerScoreItemView.prototype.setAccepted = function (num) {
    this.acceptedCell.innerHTML = num;
};
