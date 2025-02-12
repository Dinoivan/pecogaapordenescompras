sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("pecogaapordenescompras.controller.ItemDetail", {

        /**
         * Método que se ejecuta cuando la vista se carga.
         */
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("ItemDetail").attachPatternMatched(this._onObjectMatched, this);
        },

        
        formatFechaUTC: function(fecha) {
        
            // Crear un array con los nombres cortos de los meses en español
            const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        
            // Obtener los componentes de la fecha en UTC
            const dia = fecha.getUTCDate();
            const mes = meses[fecha.getUTCMonth()];
            const anio = fecha.getUTCFullYear();
        
            // Formatear la fecha al formato deseado
            return `${"ENTREGA EL"} ${dia} ${mes} ${anio}`;
        },
        formatMoney: function (value) {
            if (value == null || isNaN(value)) {
                return ""; // Manejo de valores nulos o inválidos
            }
        
            // Formatear el número con coma como separador de miles y punto para decimales
            return new Intl.NumberFormat("en-US", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(value);
        },

        /**
         * Se ejecuta cuando se navega a esta vista con parámetros.
         */
        _onObjectMatched: function () {
            this._loadItemDetails();
        },

        /**
         * Carga los detalles del ítem desde el modelo "detail".
         */
        _loadItemDetails: function () {
            var oDetailModel = this.getOwnerComponent().getModel("detail");
            debugger
            console.log("Modelo: ",oDetailModel);
            if (oDetailModel) {
                console.log("Datos cargados en el modelo 'detail':", oDetailModel.getData());
                this.getView().setModel(oDetailModel, "detail");
            } else {
                console.error("El modelo 'detail' no está definido en la vista.");
            }
        },

        /**
         * Maneja el evento de clic en una línea de servicio.
         */
        onServiceLinePress: function (oEvent) {
            var oSelectedItem = oEvent.getSource();
            var oBindingContext = oSelectedItem.getBindingContext("detail");

            if (oBindingContext) {
                var oSelectedData = oBindingContext.getObject();
                console.log("Línea de servicio seleccionada:", oSelectedData);
            } else {
                console.error("No se pudo obtener el contexto del binding.");
            }
        }
    });
});
