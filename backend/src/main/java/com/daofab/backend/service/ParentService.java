package com.daofab.backend.service;


import org.apache.commons.io.IOUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.FileInputStream;
import java.io.InputStream;


public class ParentService {

    private final JSONObject parent;
    private final JSONObject child;

    /*If JSON data is huge, then
    * private final HashMap<Integer, JSONObject> parentMap;
    * private final HashMap<Integer, JSONObject[]> childMap;
    * */

    public ParentService() {
        JSONParser parser = new JSONParser();
        try {
            InputStream inputStream = new FileInputStream("src/main/java/com/daofab/backend/service/Parent.json");
            String parentString = IOUtils.toString(inputStream);
            this.parent = (JSONObject) parser.parse(parentString);
            inputStream = new FileInputStream("src/main/java/com/daofab/backend/service/Child.json");
            String childString = IOUtils.toString(inputStream);
            this.child = (JSONObject) parser.parse(childString);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        /* As the data is not huge, we can store the data in memory.
        * If the data is huge, then we can use a HashMap with key as ID
        * and value as JSONObject. Then we can return the value
        * corresponding to the key.
        *
        * */

        /* HashMap<Integer, JSONObject> parentMap = new HashMap<>();
        *  we use parentMap.put(id, dataObject) to store the data
        *  and parentMap.get(id) to retrieve the data
        * */

        /* parentMap = new HashMap<>();
        *  JSONArray parentData = (JSONArray) parent.get("data");
        * for (int i = 0; i < parentData.size(); i++) {
        *   JSONObject dataObject = (JSONObject) parentData.get(i);
        *  parentMap.put(dataObject.get("id"), dataObject);
        * }
        * */

        /*  childMap = new HashMap<>();
        *   JSONArray childData = (JSONArray) child.get("data");
        * for (int i = 0; i < childData.size(); i++) {
        *  JSONObject dataObject = (JSONObject) childData.get(i);
        * childMap.put(dataObject.get("parentId"), dataObject);
        * }
        *  */

    }


    public JSONObject getParent(int id) {
        // Assuming that the parent data is sorted according to ID
        JSONArray data = (JSONArray) parent.get("data");
        return (JSONObject) data.get(id - 1);

        /* If Parent data is not sorted according to ID,
        * then we can either iterate array or while initializing
        * the data, we can create a HashMap with key as ID and
        * value as JSONObject. Then we can return the value
        * corresponding to the key.
        *
        * */

        /* Iterating array with normal for loop
        *   for (int i = 0; i < data.size(); i++) {
        *      JSONObject dataObject = (JSONObject) data.get(i);
        *     if (dataObject.get("id").equals(id)) {
        *        return dataObject;
        *   }
        * */

    }

    public JSONObject getChild(int id) {
        JSONArray data = (JSONArray) child.get("data");
        JSONObject result = new JSONObject();
        result.put("parentId", this.getParent(id));
        for (Object datum : data) {
            JSONObject dataObject = (JSONObject) datum;
            int parentId = Integer.parseInt(dataObject.get("parentId").toString());
            if (parentId == id) {
                result.put(dataObject.get("id"), dataObject);
            }
        }
        return result;
    }

    private int getSum(int id) {
        JSONObject data = this.getChild(id);
        int sum = 0;
        for (Object datum : data.values()) {
            JSONObject dataObject = (JSONObject) datum;
            if (dataObject.containsKey("paidAmount")) {
                sum += Integer.parseInt(dataObject.get("paidAmount").toString());
            }
        }
        return sum;
    }

    public JSONObject getPage(int page, int size) {
        JSONArray data = (JSONArray) parent.get("data");
        JSONObject result = new JSONObject();
        JSONArray pageData = new JSONArray();
        int start = (page - 1) * size;
        int end = start + size;
        int total = data.size();
        for (int i = start; i < end && i < total; i++) {
            JSONObject dataObject = (JSONObject) data.get(i);
            dataObject.put("totalPaidAmount", this.getSum(Integer.parseInt(dataObject.get("id").toString())));
            pageData.add(dataObject);
        }
        result.put("data", pageData);
        return result;
    }

}
