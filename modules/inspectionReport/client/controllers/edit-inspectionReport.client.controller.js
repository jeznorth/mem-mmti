'use strict';

angular.module('inspectionReport').controller('editInspectionReportController', ['$scope', '$state', 'InspectionReportModel', 'InspectionReportDetailModel', '_',
    function ($scope, $state, InspectionReportModel, InspectionReportDetailModel, _  ) {
        var editInspectionReport = this;
        editInspectionReport.reportOpen = true;
        editInspectionReport.addDetailOpen = false;

        editInspectionReport.report = InspectionReportModel.model;

        // if no model is set, go to the list to choose.
        if (editInspectionReport.report === null) $state.go("inspectionReport.list");

        console.log(editInspectionReport.report);

        // Handles the cancel button...
        editInspectionReport.cancel = function() {
            $state.go("inspectionReport.list");
        };

        // Handles the submit button on the form.
        editInspectionReport.submitInspectionReport = function() {
            InspectionReportModel.saveModel($state.params.inspectionReportId).then(
                function(res) {
                    console.log("saved: ", res);
                    editInspectionReport.reportOpen = false;
                    $scope.safeApply();
                },
                // If the ID is wrong let's go back to the list.
                function(data) {
                    alert("There was a problem saving the form.");
                    $state.go("inspectionReport.list");
                }
            );
        };

        // Handles the "Edit Inspection Report" button to open it for editing.
        editInspectionReport.openReport = function () {
            editInspectionReport.reportOpen = true;
        };

        // Handles the "Add Inspection Detail" button
        editInspectionReport.openDetailForm = function() {
            console.log("get a new detail!");
            InspectionReportDetailModel.getNew().then(
                function(res) {
                    console.log("got one!");
                    editInspectionReport.newDetail = res;
                    editInspectionReport.addDetailOpen = true;
                    $scope.safeApply();
                }
            );
        };

        // Handles the "Save New Inspection Detail" button
        editInspectionReport.saveNewDetail = function(detail) {
            console.log("SAVE DETAIL ", detail);
            InspectionReportDetailModel.saveModel(detail).then(
                function(res) {
                    editInspectionReport.report.inspectionDetails.push(detail);
                    InspectionReportModel.saveModel(editInspectionReport.report).then(
                        function(res) {
                            console.log("REPORT SAVED", res);
                            editInspectionReport.report = res;
                            editInspectionReport.addDetailOpen = false;
                            $scope.$apply();
                        }
                    );
                }
            );
        };

        // Handles the "Remove" button on Details...
        editInspectionReport.removeDetail = function(detail) {
            console.log("REMOVE DETAIL", detail);
            InspectionReportDetailModel.delete(detail._id).then(
                function(res) {
                    console.log("DETAIL REMOVED", res);
                    _.remove(editInspectionReport.report.inspectionDetails, detail);
                    // index = InspectionReportModel.model.inspectionDetails.indexOf(detail);
                    // InspectionReportModel.model.splice(index, 1);
                    InspectionReportModel.saveModel(editInspectionReport.report).then(
                        function(res) {
                            console.log("REPORT SAVED", res);
                            editInspectionReport.report = res;
                            $scope.$apply();
                        }
                    );
                }
            );
        };






        /*
        if ($state.params.inspectionReportId === "") {
            $state.go('inspectionReport.list');
        } else if ($state.params.inspectionReportId === "new") {
            //$state.current.name instead - returns name of state.

            InspectionReportModel.getNew().then(
                function(res) {
                    editInspectionReport.inspectionReport = res;
                    console.log(editInspectionReport.inspectionReport);
                    $scope.$apply();
                }
            );
            console.log(editInspectionReport.inspectionReport);
        } else {
            InspectionReportModel.getModel($state.params.inspectionReportId).then(
                function(res) {
                    editInspectionReport.inspectionReport = res;
                    //displayEdit.details = displayEdit.inspectionReport.inspectionDetails;
                    $scope.$apply();
                },
                // If the ID is wrong let's go back to the list.
                function(data) {
                    $state.go('inspectionReport.list');
                }
            );
        }

        editInspectionReport.options = {
            inspectionReportId: $state.params.inspectionReportId,
            mode: 'edit'
        };

        editInspectionReport.submitInspectionReport = function() {
            InspectionReportModel.saveModel($state.params.inspectionReportId).then(
                function(res) {
                    console.log("saved: ", res);
                    editInspectionReport.inspectionReport = res;
                    editInspectionReport.reportOpen = false;
                    $scope.$apply();
                },
                // If the ID is wrong let's go back to the list.
                function(data) {
                    alert("There was a problem saving the form.");
                }
            );
        }

        editInspectionReport.openReport = function () {
            editInspectionReport.reportOpen = true;
        }
        */

    }
]);