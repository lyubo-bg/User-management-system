sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	"sap/ui/core/format/DateFormat"
], function(Controller, JSONModel, DateFormat) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.UserTableController", {

		onInit : function () {
			// set explored app's demo model on this sample
            var oJSONModel = this.initSampleDataModel();
           // console.log(this.getView());
            this.getView().setModel(oJSONModel);
            debugger;
		},

		initSampleDataModel : function() {
			var oModel = new JSONModel();

			var oDateFormat = DateFormat.getDateInstance({source: {pattern: "timestamp"}, pattern: "dd/MM/yyyy"});

			jQuery.ajax({
                url : "http://localhost:8080/api/user/all",
                dataType: "json",
                type: "Get", 
                contentType : "application/json",
                async: false, 
				success: function (data) {
                    data.UsersCollection  = [];
                    for(var i = 0; i < data.length; i ++){
                        data.UsersCollection.push(data[i]);
                    }
                    console.log(data.UsersCollection);
                    oModel.setData(data);
                    
				},
				error: function (error) {
					jQuery.sap.log.error(error.statusText);
                }
                
                
            });
            return oModel;
        },

        //delete user
        handleDeletePress: function(oEvent){
            jQuery.ajax({
                url: "http://localhost:8080/api/user?id=" + this.getView().getModel().getProperty("email", oEvent.getSource().getBindingContext()),
                dataType: "json",
                type: "Get", 
                contentType: "application/json",
                async: true,
                success: function(data){
                    alert("Successfully deleted user");
                },
                error: function(error){
                    alert(error.message);
                }
            })
        }

        //

		// formatAvailableToObjectState : function (bAvailable) {
		// 	return bAvailable ? "Success" : "Error";
		// },

		// formatAvailableToIcon : function(bAvailable) {
		// 	return bAvailable ? "sap-icon://accept" : "sap-icon://decline";
		// },

		// handleDetailsPress : function(oEvent) {
		// 	MessageToast.show("Details for product with id " + this.getView().getModel().getProperty("ProductId", oEvent.getSource().getBindingContext()));
		// }

	});

});
