package com.javahelps.restservice.response;

public class JsonResponse {

    private Object _data;
    private Boolean _success;
    private String _error;

    public JsonResponse(Object data, Boolean success, String error){
        _data = data;
        _success = success;
        _error = error;
    }
}
