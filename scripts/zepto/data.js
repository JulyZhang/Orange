// Generated by CoffeeScript 1.6.3
(function() {
  define([], function() {
    return (function($) {
      var attributeData, camelize, data, dataAttr, emptyArray, exp, getData, setData;
      getData = function(node, name) {
        var camelName, id, store;
        id = node[exp];
        store = id && data[id];
        if (name !== undefined) {
          if (store) {
            if (name in store) {
              return store[name];
            }
            camelName = camelize(name);
            if (camelName in store) {
              return store[camelName];
            }
          }
          return dataAttr.call($(node), name);
        } else {
          return store || setData(node);
        }
      };
      setData = function(node, name, value) {
        var id, store;
        id = node[exp] || (node[exp] = ++$.uuid);
        store = data[id] || (data[id] = attributeData(node));
        if (name !== undefined) {
          store[camelize(name)] = value;
        }
        return store;
      };
      attributeData = function(node) {
        var store;
        store = {};
        $.each(node.attributes || emptyArray, function(i, attr) {
          if (attr.name.indexOf("data-") === 0) {
            return store[camelize(attr.name.replace("data-", ""))] = $.zepto.deserializeValue(attr.value);
          }
        });
        return store;
      };
      data = {};
      dataAttr = $.fn.data;
      camelize = $.camelCase;
      exp = $.expando = "Zepto" + (+new Date());
      emptyArray = [];
      $.fn.data = function(name, value) {
        if (value === undefined) {
          if ($.isPlainObject(name)) {
            return this.each(function(i, node) {
              return $.each(name, function(key, value) {
                return setData(node, key, value);
              });
            });
          } else {
            if (this.length === 0) {
              return undefined;
            } else {
              return getData(this[0], name);
            }
          }
        } else {
          return this.each(function() {
            return setData(this, name, value);
          });
        }
      };
      $.fn.removeData = function(names) {
        if (typeof names === "string") {
          names = names.split(/\s+/);
        }
        return this.each(function() {
          var id, store;
          id = this[exp];
          store = id && data[id];
          if (store) {
            return $.each(names || store, function(key) {
              return delete store[(names ? camelize(this) : key)];
            });
          }
        });
      };
      return ["remove", "empty"].forEach(function(methodName) {
        var origFn;
        origFn = $.fn[methodName];
        return $.fn[methodName] = function() {
          var elements;
          elements = this.find("*");
          if (methodName === "remove") {
            elements = elements.add(this);
          }
          elements.removeData();
          return origFn.call(this);
        };
      });
    })(Zepto);
  });

}).call(this);
