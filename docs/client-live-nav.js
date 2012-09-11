function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.ExceptionImplementation = {"":
 ["_msg"],
 "super": "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
}
};

$$.HashMapImplementation = {"":
 ["_keys?", "_values", "_loadLimit", "_numberOfEntries", "_numberOfDeleted"],
 "super": "Object",
 _probeForAdding$1: function(key) {
  var t1 = $.hashCode(key);
  if (t1 !== (t1 | 0))
    return this._probeForAdding$1$bailout(1, key, t1, 0, 0, 0);
  var t3 = $.get$length(this._keys);
  if (t3 !== (t3 | 0))
    return this._probeForAdding$1$bailout(2, key, t1, t3, 0, 0);
  var hash = (t1 & t3 - 1) >>> 0;
  for (var numberOfProbes = 1, insertionIndex = -1; true;) {
    t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this._probeForAdding$1$bailout(3, key, hash, numberOfProbes, insertionIndex, t1);
    if (hash < 0 || hash >= t1.length)
      throw $.ioore(hash);
    var existingKey = t1[hash];
    if (existingKey == null) {
      if (insertionIndex < 0)
        return hash;
      return insertionIndex;
    } else if ($.eqB(existingKey, key))
      return hash;
    else if (insertionIndex < 0 && $.CTC14 === existingKey)
      insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0))
      return this._probeForAdding$1$bailout(4, numberOfProbes0, key, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      t1 = env1;
      break;
    case 2:
      key = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 3:
      key = env0;
      hash = env1;
      numberOfProbes = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 4:
      numberOfProbes0 = env0;
      key = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.hashCode(key);
    case 1:
      state = 0;
      var t3 = $.get$length(this._keys);
    case 2:
      state = 0;
      var hash = $.and(t1, $.sub(t3, 1));
      var numberOfProbes = 1;
      var insertionIndex = -1;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!true)
                break L0;
              t1 = this._keys;
            case 3:
              state = 0;
              var existingKey = $.index(t1, hash);
              if (existingKey == null) {
                if ($.ltB(insertionIndex, 0))
                  return hash;
                return insertionIndex;
              } else if ($.eqB(existingKey, key))
                return hash;
              else if ($.ltB(insertionIndex, 0) && $.CTC14 === existingKey)
                insertionIndex = hash;
              var numberOfProbes0 = numberOfProbes + 1;
              hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
            case 4:
              state = 0;
              numberOfProbes = numberOfProbes0;
          }
  }
},
 _probeForLookup$1: function(key) {
  var hash = $.and($.hashCode(key), $.sub($.get$length(this._keys), 1));
  if (hash !== (hash | 0))
    return this._probeForLookup$1$bailout(1, key, hash);
  for (var numberOfProbes = 1; true;) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null)
      return -1;
    if ($.eqB(existingKey, key))
      return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForLookup$1$bailout: function(state, key, hash) {
  for (var numberOfProbes = 1; true;) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null)
      return -1;
    if ($.eqB(existingKey, key))
      return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
},
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree))
    this._grow$1($.get$length(this._keys));
},
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number')
    return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.tdiv($.mul(newCapacity, 3), 4);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListImplementation_List(newCapacity);
  this._values = $.ListImplementation_List(newCapacity, $.getRuntimeTypeInfo(this).V);
  for (var i = 0; i < capacity; ++i) {
    if (i < 0 || i >= oldKeys.length)
      throw $.ioore(i);
    var key = oldKeys[i];
    if (key == null || key === $.CTC14)
      continue;
    if (i < 0 || i >= oldValues.length)
      throw $.ioore(i);
    var value = oldValues[i];
    var newIndex = this._probeForAdding$1(key);
    $.indexSet(this._keys, newIndex, key);
    $.indexSet(this._values, newIndex, value);
  }
  this._numberOfDeleted = 0;
},
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $.tdiv($.mul(newCapacity, 3), 4);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListImplementation_List(newCapacity);
      this._values = $.ListImplementation_List(newCapacity, $.getRuntimeTypeInfo(this).V);
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC14)
          continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
},
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 clear$0$bailout: function(state, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  if ($.index(this._keys, index) == null || $.index(this._keys, index) === $.CTC14)
    this._numberOfEntries = $.add(this._numberOfEntries, 1);
  $.indexSet(this._keys, index, key);
  $.indexSet(this._values, index, value);
},
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0))
    return;
  return $.index(this._values, index);
},
 remove$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, null);
    $.indexSet(this._keys, index, $.CTC14);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
},
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
},
 get$length: function() {
  return this._numberOfEntries;
},
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC14))
      f.call$2(key, $.index(this._values, i));
  }
},
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC14))
      f.call$2(key, $.index(this._values, i));
  }
},
 containsKey$1: function(key) {
  var t1 = this._probeForLookup$1(key);
  if (typeof t1 !== 'number')
    return this.containsKey$1$bailout(1, t1);
  return !(t1 === -1);
},
 containsKey$1$bailout: function(state, t1) {
  return !$.eqB(t1, -1);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = 6;
  this._keys = $.ListImplementation_List(8);
  this._values = $.ListImplementation_List(8, $.getRuntimeTypeInfo(this).V);
},
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 "super": "Object",
 clear$0: function() {
  $.clear(this._backingMap);
},
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0))
    throw $.iae(value);
  if (value < 0 || value >= t1.length)
    throw $.ioore(value);
  t1[value] = value;
},
 add$1$bailout: function(state, t1, value) {
  $.indexSet(t1, value, value);
},
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
},
 remove$1: function(value) {
  var t1 = this._backingMap;
  if (t1.containsKey$1(value) !== true)
    return false;
  t1.remove$1(value);
  return true;
},
 addAll$1: function(collection) {
  $.forEach(collection, new $.HashSetImplementation_addAll__(this));
},
 forEach$1: function(f) {
  $.forEach(this._backingMap, new $.HashSetImplementation_forEach__(f));
},
 filter$1: function(f) {
  var result = $.HashSetImplementation$($.getRuntimeTypeInfo(this).E);
  $.forEach(this._backingMap, new $.HashSetImplementation_filter__(f, result));
  return result;
},
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
},
 get$length: function() {
  return $.get$length(this._backingMap);
},
 iterator$0: function() {
  return $.HashSetIterator$(this, $.getRuntimeTypeInfo(this).E);
},
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$($.getRuntimeTypeInfo(this).E, $.getRuntimeTypeInfo(this).E);
},
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_entries", "_nextValidIndex"],
 "super": "Object",
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))
    return this.hasNext$0$bailout(1, t1, t2);
  var t4 = t2.length;
  if (t1 >= t4)
    return false;
  if (t1 !== (t1 | 0))
    throw $.iae(t1);
  if (t1 < 0 || t1 >= t4)
    throw $.ioore(t1);
  if (t2[t1] === $.CTC14)
    this._advance$0();
  return this._nextValidIndex < t2.length;
},
 hasNext$0$bailout: function(state, t1, t2) {
  if ($.geB(t1, $.get$length(t2)))
    return false;
  if ($.index(t2, this._nextValidIndex) === $.CTC14)
    this._advance$0();
  return $.lt(this._nextValidIndex, $.get$length(t2));
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC11);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1);
  var t3 = this._nextValidIndex;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  var res = t1[t3];
  this._advance$0();
  return res;
},
 next$0$bailout: function(state, t1) {
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
},
 get$next: function() { return new $.BoundClosure(this, 'next$0'); },
 _advance$0: function() {
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this._advance$0$bailout(1, t1);
  var length$ = t1.length;
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if (t2 >= length$)
      break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0))
      throw $.iae(t2);
    if (t2 < 0 || t2 >= t1.length)
      throw $.ioore(t2);
    entry = t1[t2];
  } while (entry == null || entry === $.CTC14);
},
 _advance$0$bailout: function(state, t1) {
  var length$ = $.get$length(t1);
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if ($.geB(t2, length$))
      break;
    entry = $.index(t1, this._nextValidIndex);
  } while (entry == null || entry === $.CTC14);
},
 HashSetIterator$1: function(set_) {
  this._advance$0();
}
};

$$._DeletedKeySentinel = {"":
 [],
 "super": "Object"
};

$$.KeyValuePair = {"":
 ["key?", "value="],
 "super": "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_list", "_map"],
 "super": "Object",
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1.containsKey$1(key) === true) {
    if (key !== (key | 0))
      throw $.iae(key);
    if (key < 0 || key >= t1.length)
      throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    var t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value, $.getRuntimeTypeInfo(this).K, $.getRuntimeTypeInfo(this).V));
    t2 = t2.lastEntry$0();
    if (key !== (key | 0))
      throw $.iae(key);
    if (key < 0 || key >= t1.length)
      throw $.ioore(key);
    t1[key] = t2;
  }
},
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  if (t1.containsKey$1(key) === true)
    $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value, $.getRuntimeTypeInfo(this).K, $.getRuntimeTypeInfo(this).V));
    $.indexSet(t1, key, t2.lastEntry$0());
  }
},
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null)
    return;
  return entry.get$element().get$value();
},
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry == null)
    return;
  entry.remove$0();
  return entry.get$element().get$value();
},
 forEach$1: function(f) {
  $.forEach(this._list, new $.LinkedHashMapImplementation_forEach__(f));
},
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
},
 get$length: function() {
  return $.get$length(this._map);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._list);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$($.getRuntimeTypeInfo(this).K, 'DoubleLinkedQueueEntry<KeyValuePair<K, V>>');
  this._list = $.DoubleLinkedQueue$('KeyValuePair<K, V>');
},
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_previous=", "_next=", "_element?"],
 "super": "Object",
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
},
 prepend$1: function(e) {
  $.DoubleLinkedQueueEntry$(e, $.getRuntimeTypeInfo(this).E)._link$2(this._previous, this);
},
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = null;
  this._previous = null;
  return this._element;
},
 _asNonSentinelEntry$0: function() {
  return this;
},
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
},
 get$element: function() {
  return this._element;
},
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
}
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_previous", "_next", "_element"],
 "super": "DoubleLinkedQueueEntry",
 remove$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 _asNonSentinelEntry$0: function() {
  return;
},
 get$element: function() {
  throw $.captureStackTrace($.CTC13);
},
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
}
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 "super": "Object",
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
},
 add$1: function(value) {
  this.addLast$1(value);
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection); t1.hasNext$0() === true;)
    this.add$1(t1.next$0());
},
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
},
 first$0: function() {
  return this._sentinel.get$_next().get$element();
},
 get$first: function() { return new $.BoundClosure(this, 'first$0'); },
 last$0: function() {
  return this._sentinel.get$_previous().get$element();
},
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
},
 get$length: function() {
  var t1 = {};
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
},
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
},
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
},
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    f.call$1(entry.get$_element());
    entry = nextEntry;
  }
},
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$($.getRuntimeTypeInfo(this).E);
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    if (f.call$1(entry.get$_element()) === true)
      other.addLast$1(entry.get$_element());
    entry = nextEntry;
  }
  return other;
},
 iterator$0: function() {
  return $._DoubleLinkedQueueIterator$(this._sentinel, $.getRuntimeTypeInfo(this).E);
},
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 DoubleLinkedQueue$0: function() {
  this._sentinel = $._DoubleLinkedQueueEntrySentinel$($.getRuntimeTypeInfo(this).E);
},
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_sentinel", "_currentEntry"],
 "super": "Object",
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC11);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
},
 get$next: function() { return new $.BoundClosure(this, 'next$0'); },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
}
};

$$.JSSyntaxRegExp = {"":
 ["_ignoreCase", "_multiLine", "_lib0_pattern"],
 "super": "Object",
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
},
 get$pattern: function() {
  return this._lib0_pattern;
},
 get$multiLine: function() {
  return this._multiLine;
},
 get$ignoreCase: function() {
  return this._ignoreCase;
},
 is$RegExp: true
};

$$.StringBufferImpl = {"":
 ["_buffer", "_length"],
 "super": "Object",
 get$length: function() {
  return this._length;
},
 isEmpty$0: function() {
  return this._length === 0;
},
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true)
    return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number')
    return this.add$1$bailout(1, str, t1);
  var t3 = $.get$length(str);
  if (typeof t3 !== 'number')
    return this.add$1$bailout(2, t1, t3);
  this._length = t1 + t3;
  return this;
},
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true)
        return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t3 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t3);
      return this;
  }
},
 addAll$1: function(objects) {
  for (var t1 = $.iterator(objects); t1.hasNext$0() === true;)
    this.add$1(t1.next$0());
  return this;
},
 clear$0: function() {
  this._buffer = $.ListImplementation_List(null, 'String');
  this._length = 0;
  return this;
},
 toString$0: function() {
  if ($.get$length(this._buffer) === 0)
    return '';
  if ($.get$length(this._buffer) === 1)
    return $.index(this._buffer, 0);
  var result = $.stringJoinUnchecked($.StringImplementation__toJsStringArray(this._buffer), '');
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
},
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
}
};

$$.IndexOutOfRangeException = {"":
 ["_value?"],
 "super": "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._value);
}
};

$$.IllegalAccessException = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'Attempt to modify an immutable object';
}
};

$$.NoSuchMethodException = {"":
 ["_receiver", "_functionName", "_arguments", "_existingArgumentNames"],
 "super": "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(1, t1, sb);
  var i = 0;
  for (; i < t1.length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(2, sb, t1);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1.length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
},
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      sb = env1;
      break;
    case 2:
      sb = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        if (i > 0)
          sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null)
        return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      else {
        var actualParameters = sb.toString$0();
        sb = $.StringBufferImpl$('');
        for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
          if (i > 0)
            sb.add$1(', ');
          sb.add$1($.index(t1, i));
        }
        var formalParameters = sb.toString$0();
        t1 = this._functionName;
        return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
      }
  }
}
};

$$.ObjectNotClosureException = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'Object is not closure';
}
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 "super": "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
}
};

$$.StackOverflowException = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'Stack Overflow';
}
};

$$.FormatException = {"":
 ["message"],
 "super": "Object",
 toString$0: function() {
  return 'FormatException: ' + $.S(this.message);
}
};

$$.NullPointerException = {"":
 ["functionName", "arguments"],
 "super": "Object",
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null)
    return this.get$exceptionName();
  else
    return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
},
 get$exceptionName: function() {
  return 'NullPointerException';
}
};

$$.NoMoreElementsException = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
}
};

$$.EmptyQueueException = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'EmptyQueueException';
}
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 "super": "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
}
};

$$.NotImplementedException = {"":
 ["_message"],
 "super": "Object",
 toString$0: function() {
  var t1 = this._message;
  return !(t1 == null) ? 'NotImplementedException: ' + $.S(t1) : 'NotImplementedException';
}
};

$$.IllegalJSRegExpException = {"":
 ["_pattern", "_errmsg"],
 "super": "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
}
};

$$.Object = {"":
 [],
 "super": "",
 toString$0: function() {
  return $.ObjectImplementation_toStringImpl(this);
},
 operator$eq$1: function(other) {
  return this === other;
}
};

$$.ListIterator = {"":
 ["i", "list"],
 "super": "Object",
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1);
  return t1 < this.list.length;
},
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, this.list.length);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.NoMoreElementsException$());
  var value = this.list[this.i];
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
},
 next$0$bailout: function(state, t1, value) {
  this.i = $.add(t1, 1);
  return value;
},
 get$next: function() { return new $.BoundClosure(this, 'next$0'); }
};

$$.Closure = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'Closure';
}
};

$$.ConstantMap = {"":
 ["length?", "_jsObject", "_lib1_keys?"],
 "super": "Object",
 containsKey$1: function(key) {
  if (typeof key !== 'string')
    return this.containsKey$1$bailout(1, key);
  if (key === '__proto__')
    return false;
  return $.jsHasOwnProperty(this._jsObject, key);
},
 containsKey$1$bailout: function(state, key) {
  if ($.eqB(key, '__proto__'))
    return false;
  return $.jsHasOwnProperty(this._jsObject, key);
},
 operator$index$1: function(key) {
  if (this.containsKey$1(key) !== true)
    return;
  return this._jsObject[key];
},
 forEach$1: function(f) {
  $.forEach(this._lib1_keys, new $.ConstantMap_forEach_anon(this, f));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 _throwImmutable$0: function() {
  throw $.captureStackTrace($.CTC23);
},
 operator$indexSet$2: function(key, val) {
  return this._throwImmutable$0();
},
 remove$1: function(key) {
  return this._throwImmutable$0();
},
 clear$0: function() {
  return this._throwImmutable$0();
},
 is$Map: function() { return true; }
};

$$.MetaInfo = {"":
 ["_tag?", "_tags", "_set?"],
 "super": "Object"
};

$$.SearchText = {"":
 ["text?", "lowerCase", "camelCase?"],
 "super": "Object",
 get$length: function() {
  return $.get$length(this.text);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
}
};

$$.StringMatch = {"":
 ["searchText", "text?", "matchOffset?", "matchEnd?"],
 "super": "Object",
 toHtml$0: function() {
  var t1 = this.text;
  return $.S($.substring$2(t1, 0, this.matchOffset)) + '<span class="drop-down-link-highlight">' + $.S(this.get$matchText()) + '</span>' + $.S($.substring$1(t1, this.matchEnd));
},
 get$matchText: function() {
  return $.substring$2(this.text, this.matchOffset, this.matchEnd);
},
 get$isFullMatch: function() {
  return $.eq(this.text, this.searchText.get$text());
},
 get$isExactMatch: function() {
  return $.eq(this.get$matchText(), this.searchText.get$text());
},
 get$isCamelCaseMatch: function() {
  return $.eq(this.get$matchText(), this.searchText.get$camelCase());
}
};

$$.Result = {"":
 ["prefix?", "match?", "library", "type?", "args", "kind?", "url?", "row?"],
 "super": "Object",
 get$isTopLevel: function() {
  return this.prefix == null && this.type == null;
},
 addRow$1: function(table) {
  if (!(this.row == null))
    return;
  var t1 = new $.Result_addRow_clickHandler(this);
  this.row = table.insertRow$1($.get$length(table.get$rows()));
  $.add$1(this.row.get$classes(), 'drop-down-link-tr');
  $.add$1(this.row.get$on().get$mouseDown(), new $.Result_addRow_anon());
  $.add$1(this.row.get$on().get$click(), t1);
  $.add$1(this.row.get$on().get$mouseUp(), new $.Result_addRow_anon0());
  var sb = $.StringBufferImpl$('');
  sb.add$1('<td class="drop-down-link-td">');
  sb.add$1('<table class="drop-down-table"><tr><td colspan="2">');
  t1 = this.kind;
  if (typeof t1 !== 'string')
    return this.addRow$1$bailout(1, t1, sb);
  if (t1 === 'getter')
    sb.add$1('get ');
  else if (t1 === 'setter')
    sb.add$1('set ');
  sb.add$1(this.match.toHtml$0());
  if (t1 === 'class' || t1 === 'interface' || t1 === 'typedef')
    sb.add$1(this.args);
  else if (t1 === 'constructor' || t1 === 'method')
    sb.add$1('(...)');
  sb.add$1('</td></tr><tr><td class="drop-down-link-kind">');
  sb.add$1($.kindToString(t1));
  t1 = this.prefix;
  if (!(t1 == null)) {
    sb.add$1(' in ');
    sb.add$1(t1.toHtml$0());
    sb.add$1(this.args);
  } else {
    t1 = this.type;
    if (!(t1 == null)) {
      sb.add$1(' in ');
      sb.add$1(t1);
      sb.add$1(this.args);
    }
  }
  sb.add$1('</td><td class="drop-down-link-library">');
  t1 = this.library;
  if (!(t1 == null))
    sb.add$1('library ' + $.S(t1));
  sb.add$1('</td></tr></table></td>');
  t1 = sb.toString$0();
  this.row.set$innerHTML(t1);
},
 addRow$1$bailout: function(state, t1, sb) {
  if ($.eqB(t1, 'getter'))
    sb.add$1('get ');
  else if ($.eqB(t1, 'setter'))
    sb.add$1('set ');
  sb.add$1(this.match.toHtml$0());
  if ($.eqB(t1, 'class') || $.eqB(t1, 'interface') || $.eqB(t1, 'typedef'))
    sb.add$1(this.args);
  else if ($.eqB(t1, 'constructor') || $.eqB(t1, 'method'))
    sb.add$1('(...)');
  sb.add$1('</td></tr><tr><td class="drop-down-link-kind">');
  sb.add$1($.kindToString(t1));
  t1 = this.prefix;
  if (!(t1 == null)) {
    sb.add$1(' in ');
    sb.add$1(t1.toHtml$0());
    sb.add$1(this.args);
  } else {
    t1 = this.type;
    if (!(t1 == null)) {
      sb.add$1(' in ');
      sb.add$1(t1);
      sb.add$1(this.args);
    }
  }
  sb.add$1('</td><td class="drop-down-link-library">');
  t1 = this.library;
  if (!(t1 == null))
    sb.add$1('library ' + $.S(t1));
  sb.add$1('</td></tr></table></td>');
  t1 = sb.toString$0();
  this.row.set$innerHTML(t1);
}
};

$$._Default = {"":
 [],
 "super": "Object"
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 "super": "_ElementEventsImpl",
 get$blur: function() {
  return this.operator$index$1('blur');
},
 get$focus: function() {
  return this.operator$index$1('focus');
},
 focus$0: function() { return this.get$focus().call$0(); }
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 "super": "_WorkerContextEventsImpl"
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 "super": "_ElementEventsImpl",
 get$blur: function() {
  return this.operator$index$1('blur');
},
 get$change: function() {
  return this.operator$index$1('change');
},
 get$click: function() {
  return this.operator$index$1('click');
},
 get$focus: function() {
  return this.operator$index$1('focus');
},
 focus$0: function() { return this.get$focus().call$0(); },
 get$keyDown: function() {
  return this.operator$index$1('keydown');
},
 get$keyUp: function() {
  return this.operator$index$1('keyup');
},
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
},
 get$readyStateChange: function() {
  return this.operator$index$1('readystatechange');
},
 get$reset: function() {
  return this.operator$index$1('reset');
}
};

$$.FilteredElementList = {"":
 ["_node", "_childNodes"],
 "super": "Object",
 get$_filtered: function() {
  return $.ListImplementation_List$from($.filter(this._childNodes, new $.FilteredElementList__filtered_anon()));
},
 get$first: function() {
  for (var t1 = $.iterator(this._childNodes); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (typeof t2 === 'object' && t2 !== null && t2.is$Element())
      return t2;
  }
  return;
},
 first$0: function() { return this.get$first().call$0(); },
 forEach$1: function(f) {
  $.forEach(this.get$_filtered(), f);
},
 operator$indexSet$2: function(index, value) {
  this.operator$index$1(index).replaceWith$1(value);
},
 set$length: function(newLength) {
  var len = $.get$length(this);
  if ($.geB(newLength, len))
    return;
  else if ($.ltB(newLength, 0))
    throw $.captureStackTrace($.CTC17);
  this.removeRange$2($.sub(newLength, 1), $.sub(len, newLength));
},
 add$1: function(value) {
  $.add$1(this._childNodes, value);
},
 get$add: function() { return new $.BoundClosure0(this, 'add$1'); },
 addAll$1: function(collection) {
  $.forEach(collection, this.get$add());
},
 addLast$1: function(value) {
  this.add$1(value);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC20);
},
 removeRange$2: function(start, rangeLength) {
  $.forEach($.getRange(this.get$_filtered(), start, rangeLength), new $.FilteredElementList_removeRange_anon());
},
 clear$0: function() {
  $.clear(this._childNodes);
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    result.remove$0();
  return result;
},
 filter$1: function(f) {
  return $.filter(this.get$_filtered(), f);
},
 isEmpty$0: function() {
  return $.isEmpty(this.get$_filtered());
},
 get$length: function() {
  return $.get$length(this.get$_filtered());
},
 operator$index$1: function(index) {
  return $.index(this.get$_filtered(), index);
},
 iterator$0: function() {
  return $.iterator(this.get$_filtered());
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this.get$_filtered(), start, rangeLength);
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this.get$_filtered(), element, start);
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return $.last(this.get$_filtered());
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenCSSClassSet = {"":
 ["_lib_element"],
 "super": "_CssClassSet",
 _write$1: function(s) {
  throw $.captureStackTrace($.CTC21);
},
 _read$0: function() {
  return $.HashSetImplementation$('String');
}
};

$$._ChildrenElementList = {"":
 ["_lib_element?", "_childElements"],
 "super": "Object",
 _toList$0: function() {
  var t1 = this._childElements;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this._toList$0$bailout(1, t1);
  var output = $.ListImplementation_List(t1.length);
  for (var len = t1.length, i = 0; i < len; ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var t2 = t1[i];
    if (i < 0 || i >= output.length)
      throw $.ioore(i);
    output[i] = t2;
  }
  return output;
},
 _toList$0$bailout: function(state, t1) {
  var output = $.ListImplementation_List($.get$length(t1));
  for (var len = $.get$length(t1), i = 0; $.ltB(i, len); ++i) {
    var t2 = $.index(t1, i);
    if (i < 0 || i >= output.length)
      throw $.ioore(i);
    output[i] = t2;
  }
  return output;
},
 get$first: function() {
  return this._lib_element.get$$$dom_firstElementChild();
},
 first$0: function() { return this.get$first().call$0(); },
 forEach$1: function(f) {
  for (var t1 = $.iterator(this._childElements); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
},
 filter$1: function(f) {
  var output = [];
  this.forEach$1(new $._ChildrenElementList_filter_anon(f, output));
  return $._FrozenElementList$_wrap(output);
},
 isEmpty$0: function() {
  return this._lib_element.get$$$dom_firstElementChild() == null;
},
 get$length: function() {
  return $.get$length(this._childElements);
},
 operator$index$1: function(index) {
  return $.index(this._childElements, index);
},
 operator$indexSet$2: function(index, value) {
  this._lib_element.$dom_replaceChild$2(value, $.index(this._childElements, index));
},
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC16);
},
 add$1: function(value) {
  this._lib_element.$dom_appendChild$1(value);
  return value;
},
 addLast$1: function(value) {
  return this.add$1(value);
},
 iterator$0: function() {
  return $.iterator(this._toList$0());
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._lib_element; t1.hasNext$0() === true;)
    t2.$dom_appendChild$1(t1.next$0());
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC20);
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($._Lists_getRange(this, start, rangeLength, []));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 clear$0: function() {
  this._lib_element.set$text('');
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._lib_element.$dom_removeChild$1(result);
  return result;
},
 last$0: function() {
  return this._lib_element.get$$$dom_lastElementChild();
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementList = {"":
 ["_nodeList"],
 "super": "Object",
 get$first: function() {
  return $.index(this._nodeList, 0);
},
 first$0: function() { return this.get$first().call$0(); },
 forEach$1: function(f) {
  for (var t1 = $.iterator(this); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
},
 filter$1: function(f) {
  var out = $._ElementList$([]);
  for (var t1 = $.iterator(this); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      out.add$1(t2);
  }
  return out;
},
 isEmpty$0: function() {
  return $.isEmpty(this._nodeList);
},
 get$length: function() {
  return $.get$length(this._nodeList);
},
 operator$index$1: function(index) {
  return $.index(this._nodeList, index);
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC16);
},
 set$length: function(newLength) {
  $.set$length(this._nodeList, newLength);
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC16);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC16);
},
 iterator$0: function() {
  return $._FrozenElementListIterator$(this);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC16);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC16);
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($.getRange(this._nodeList, start, rangeLength));
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._nodeList, element, start);
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 clear$0: function() {
  throw $.captureStackTrace($.CTC16);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC16);
},
 last$0: function() {
  return $.last(this._nodeList);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementListIterator = {"":
 ["_lib_list", "_index"],
 "super": "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC11);
  var t1 = this._lib_list;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._index;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._index = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  return t1[t3];
},
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true)
        throw $.captureStackTrace($.CTC11);
      var t1 = this._lib_list;
    case 1:
      state = 0;
      var t3 = this._index;
    case 2:
      state = 0;
      this._index = $.add(t3, 1);
      return $.index(t1, t3);
  }
},
 get$next: function() { return new $.BoundClosure(this, 'next$0'); },
 hasNext$0: function() {
  var t1 = this._index;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = $.get$length(this._lib_list);
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 < t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._index;
    case 1:
      state = 0;
      var t3 = $.get$length(this._lib_list);
    case 2:
      state = 0;
      return $.lt(t1, t3);
  }
}
};

$$._ElementList = {"":
 ["_lib_list"],
 "super": "_ListWrapper",
 filter$1: function(f) {
  return $._ElementList$($._ListWrapper.prototype.filter$1.call(this, f));
},
 getRange$2: function(start, rangeLength) {
  return $._ElementList$($._ListWrapper.prototype.getRange$2.call(this, start, rangeLength));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ElementAttributeMap = {"":
 ["_lib_element?"],
 "super": "Object",
 containsKey$1: function(key) {
  return this._lib_element.$dom_hasAttribute$1(key);
},
 operator$index$1: function(key) {
  return this._lib_element.$dom_getAttribute$1(key);
},
 operator$indexSet$2: function(key, value) {
  this._lib_element.$dom_setAttribute$2(key, $.S(value));
},
 remove$1: function(key) {
  var t1 = this._lib_element;
  var value = t1.$dom_getAttribute$1(key);
  t1.$dom_removeAttribute$1(key);
  return value;
},
 clear$0: function() {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.clear$0$bailout(1, attributes);
  for (var i = attributes.length - 1; i >= 0; --i) {
    if (i < 0 || i >= attributes.length)
      throw $.ioore(i);
    this.remove$1(attributes[i].get$name());
  }
},
 clear$0$bailout: function(state, attributes) {
  for (var i = $.sub($.get$length(attributes), 1); $.geB(i, 0); i = $.sub(i, 1))
    this.remove$1($.index(attributes, i).get$name());
},
 forEach$1: function(f) {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.forEach$1$bailout(1, f, attributes);
  for (var len = attributes.length, i = 0; i < len; ++i) {
    if (i < 0 || i >= attributes.length)
      throw $.ioore(i);
    var item = attributes[i];
    f.call$2(item.get$name(), item.get$value());
  }
},
 forEach$1$bailout: function(state, f, attributes) {
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var item = $.index(attributes, i);
    f.call$2(item.get$name(), item.get$value());
  }
},
 get$length: function() {
  return $.get$length(this._lib_element.get$$$dom_attributes());
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 is$Map: function() { return true; }
};

$$._DataAttributeMap = {"":
 ["$$dom_attributes?"],
 "super": "Object",
 containsKey$1: function(key) {
  return this.$$dom_attributes.containsKey$1(this._attr$1(key));
},
 operator$index$1: function(key) {
  return $.index(this.$$dom_attributes, this._attr$1(key));
},
 operator$indexSet$2: function(key, value) {
  $.indexSet(this.$$dom_attributes, this._attr$1(key), $.S(value));
},
 remove$1: function(key) {
  return this.$$dom_attributes.remove$1(this._attr$1(key));
},
 clear$0: function() {
  for (var t1 = $.iterator(this.getKeys$0()); t1.hasNext$0() === true;)
    this.remove$1(t1.next$0());
},
 forEach$1: function(f) {
  $.forEach(this.$$dom_attributes, new $._DataAttributeMap_forEach_anon(this, f));
},
 getKeys$0: function() {
  var keys = $.ListImplementation_List(null, 'String');
  $.forEach(this.$$dom_attributes, new $._DataAttributeMap_getKeys_anon(this, keys));
  return keys;
},
 get$length: function() {
  return $.get$length(this.getKeys$0());
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 _attr$1: function(key) {
  return 'data-' + $.S(key);
},
 _matches$1: function(key) {
  return $.startsWith(key, 'data-');
},
 _strip$1: function(key) {
  return $.substring$1(key, 5);
},
 is$Map: function() { return true; }
};

$$._CssClassSet = {"":
 ["_lib_element?"],
 "super": "Object",
 toString$0: function() {
  return this._formatSet$1(this._read$0());
},
 iterator$0: function() {
  return $.iterator(this._read$0());
},
 forEach$1: function(f) {
  $.forEach(this._read$0(), f);
},
 filter$1: function(f) {
  return $.filter(this._read$0(), f);
},
 isEmpty$0: function() {
  return $.isEmpty(this._read$0());
},
 get$length: function() {
  return $.get$length(this._read$0());
},
 contains$1: function(value) {
  return $.contains$1(this._read$0(), value);
},
 add$1: function(value) {
  this._modify$1(new $._CssClassSet_add_anon(value));
},
 remove$1: function(value) {
  var s = this._read$0();
  var result = s.remove$1(value);
  this._write$1(s);
  return result;
},
 addAll$1: function(collection) {
  this._modify$1(new $._CssClassSet_addAll_anon(collection));
},
 clear$0: function() {
  this._modify$1(new $._CssClassSet_clear_anon());
},
 _modify$1: function(f) {
  var s = this._read$0();
  f.call$1(s);
  this._write$1(s);
},
 _read$0: function() {
  var s = $.HashSetImplementation$('String');
  for (var t1 = $.iterator($.split(this._classname$0(), ' ')); t1.hasNext$0() === true;) {
    var trimmed = $.trim(t1.next$0());
    if ($.isEmpty(trimmed) !== true)
      s.add$1(trimmed);
  }
  return s;
},
 _classname$0: function() {
  return this._lib_element.get$$$dom_className();
},
 _write$1: function(s) {
  var t1 = this._formatSet$1(s);
  this._lib_element.set$$$dom_className(t1);
},
 _formatSet$1: function(s) {
  return $.Strings_join($.ListImplementation_List$from(s), ' ');
},
 is$Collection: function() { return true; }
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$blur: function() {
  return this.operator$index$1('blur');
},
 get$change: function() {
  return this.operator$index$1('change');
},
 get$click: function() {
  return this.operator$index$1('click');
},
 get$focus: function() {
  return this.operator$index$1('focus');
},
 focus$0: function() { return this.get$focus().call$0(); },
 get$keyDown: function() {
  return this.operator$index$1('keydown');
},
 get$keyUp: function() {
  return this.operator$index$1('keyup');
},
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
},
 get$reset: function() {
  return this.operator$index$1('reset');
}
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$open: function() {
  return this.operator$index$1('open');
},
 open$3: function(arg0, arg1, arg2) { return this.get$open().call$3(arg0, arg1, arg2); }
};

$$._EventsImpl = {"":
 ["_ptr?"],
 "super": "Object",
 operator$index$1: function(type) {
  return $._EventListenerListImpl$(this._ptr, type);
}
};

$$._EventListenerListImpl = {"":
 ["_ptr?", "_type"],
 "super": "Object",
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
},
 add$1: function(listener) {
  return this.add$2(listener,false)
},
 remove$2: function(listener, useCapture) {
  this._remove$2(listener, useCapture);
  return this;
},
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
},
 _remove$2: function(listener, useCapture) {
  this._ptr.$dom_removeEventListener$3(this._type, listener, useCapture);
}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 "super": "_ElementEventsImpl",
 get$blur: function() {
  return this.operator$index$1('blur');
},
 get$focus: function() {
  return this.operator$index$1('focus');
},
 focus$0: function() { return this.get$focus().call$0(); }
};

$$._HttpRequestEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$readyStateChange: function() {
  return this.operator$index$1('readystatechange');
}
};

$$._HttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 "super": "_IDBRequestEventsImpl"
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._IDBVersionChangeRequestEventsImpl = {"":
 ["_ptr"],
 "super": "_IDBRequestEventsImpl"
};

$$._InputElementEventsImpl = {"":
 ["_ptr"],
 "super": "_ElementEventsImpl"
};

$$._JavaScriptAudioNodeEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._MediaElementEventsImpl = {"":
 ["_ptr"],
 "super": "_ElementEventsImpl"
};

$$._MediaStreamEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._MediaStreamTrackEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._MediaStreamTrackListEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._ChildNodeListLazy = {"":
 ["_this"],
 "super": "Object",
 get$first: function() {
  return this._this.firstChild;
},
 first$0: function() { return this.get$first().call$0(); },
 last$0: function() {
  return this._this.lastChild;
},
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
},
 addLast$1: function(value) {
  this._this.$dom_appendChild$1(value);
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._this; t1.hasNext$0() === true;)
    t2.$dom_appendChild$1(t1.next$0());
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._this.$dom_removeChild$1(result);
  return result;
},
 clear$0: function() {
  this._this.set$text('');
},
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
},
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
},
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ListWrapper = {"":
 [],
 "super": "Object",
 iterator$0: function() {
  return $.iterator(this._lib_list);
},
 forEach$1: function(f) {
  return $.forEach(this._lib_list, f);
},
 filter$1: function(f) {
  return $.filter(this._lib_list, f);
},
 isEmpty$0: function() {
  return $.isEmpty(this._lib_list);
},
 get$length: function() {
  return $.get$length(this._lib_list);
},
 operator$index$1: function(index) {
  return $.index(this._lib_list, index);
},
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._lib_list, index, value);
},
 set$length: function(newLength) {
  $.set$length(this._lib_list, newLength);
},
 add$1: function(value) {
  return $.add$1(this._lib_list, value);
},
 addLast$1: function(value) {
  return $.addLast(this._lib_list, value);
},
 addAll$1: function(collection) {
  return $.addAll(this._lib_list, collection);
},
 sort$1: function(compare) {
  return $.sort(this._lib_list, compare);
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._lib_list, element, start);
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 clear$0: function() {
  return $.clear(this._lib_list);
},
 removeLast$0: function() {
  return $.removeLast(this._lib_list);
},
 last$0: function() {
  return $.last(this._lib_list);
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._lib_list, start, rangeLength);
},
 get$first: function() {
  return $.index(this._lib_list, 0);
},
 first$0: function() { return this.get$first().call$0(); },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NodeListWrapper = {"":
 ["_lib_list"],
 "super": "_ListWrapper",
 filter$1: function(f) {
  return $._NodeListWrapper$($.filter(this._lib_list, f));
},
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($.getRange(this._lib_list, start, rangeLength));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$click: function() {
  return this.operator$index$1('click');
}
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$open: function() {
  return this.operator$index$1('open');
},
 open$3: function(arg0, arg1, arg2) { return this.get$open().call$3(arg0, arg1, arg2); }
};

$$._AttributeClassSet = {"":
 ["_lib_element"],
 "super": "_CssClassSet",
 $dom_className$0: function() {
  return $.index(this._lib_element.get$attributes(), 'class');
},
 get$$$dom_className: function() { return new $.BoundClosure(this, '$dom_className$0'); },
 _write$1: function(s) {
  $.indexSet(this._lib_element.get$attributes(), 'class', this._formatSet$1(s));
}
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$blur: function() {
  return this.operator$index$1('blur');
},
 get$change: function() {
  return this.operator$index$1('change');
},
 get$click: function() {
  return this.operator$index$1('click');
},
 get$focus: function() {
  return this.operator$index$1('focus');
},
 focus$0: function() { return this.get$focus().call$0(); },
 get$keyDown: function() {
  return this.operator$index$1('keydown');
},
 get$keyUp: function() {
  return this.operator$index$1('keyup');
},
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
},
 get$reset: function() {
  return this.operator$index$1('reset');
}
};

$$._SharedWorkerContextEventsImpl = {"":
 ["_ptr"],
 "super": "_WorkerContextEventsImpl"
};

$$._SpeechRecognitionEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._TextTrackEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._TextTrackCueEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._TextTrackListEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._WebSocketEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$open: function() {
  return this.operator$index$1('open');
},
 open$3: function(arg0, arg1, arg2) { return this.get$open().call$3(arg0, arg1, arg2); }
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl",
 get$blur: function() {
  return this.operator$index$1('blur');
},
 get$change: function() {
  return this.operator$index$1('change');
},
 get$click: function() {
  return this.operator$index$1('click');
},
 get$focus: function() {
  return this.operator$index$1('focus');
},
 focus$0: function() { return this.get$focus().call$0(); },
 get$keyDown: function() {
  return this.operator$index$1('keydown');
},
 get$keyUp: function() {
  return this.operator$index$1('keyup');
},
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
},
 get$reset: function() {
  return this.operator$index$1('reset');
}
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 "super": "_AbstractWorkerEventsImpl"
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 "super": "_EventsImpl"
};

$$._DOMWindowCrossFrameImpl = {"":
 ["_window"],
 "super": "Object",
 focus$0: function() {
  return $._DOMWindowCrossFrameImpl__focus(this._window);
},
 get$focus: function() { return new $.BoundClosure(this, 'focus$0'); },
 blur$0: function() {
  return $._DOMWindowCrossFrameImpl__blur(this._window);
},
 get$blur: function() { return new $.BoundClosure(this, 'blur$0'); }
};

$$._LocationWrapper = {"":
 ["_ptr?"],
 "super": "Object",
 set$href: function(value) {
  return $._LocationWrapper__set(this._ptr, 'href', value);
},
 toString$0: function() {
  return $._LocationWrapper__toString(this._ptr);
},
 is$Location: function() { return true; }
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_array", "_pos"],
 "super": "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
}
};

$$._VariableSizeListIterator = {"":
 [],
 "super": "Object",
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t3, t1);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC11);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._pos = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  return t1[t3];
},
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true)
        throw $.captureStackTrace($.CTC11);
      var t1 = this._array;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t3, 1);
      return $.index(t1, t3);
  }
},
 get$next: function() { return new $.BoundClosure(this, 'next$0'); }
};

$$._JsonParser = {"":
 ["json", "length?", "position"],
 "super": "Object",
 _parseToplevel$0: function() {
  var result = this._parseValue$0();
  if (!(this._token$0() == null))
    this._error$1('Junk at the end of JSON input');
  return result;
},
 _parseValue$0: function() {
  var token = this._token$0();
  if (token == null)
    this._error$1('Nothing to parse');
  switch (token) {
    case 34:
      return this._parseString$0();
    case 45:
      return this._parseNumber$0();
    case 110:
      return this._expectKeyword$2('null', null);
    case 102:
      return this._expectKeyword$2('false', false);
    case 116:
      return this._expectKeyword$2('true', true);
    case 123:
      return this._parseObject$0();
    case 91:
      return this._parseList$0();
    default:
      this._error$1('Unexpected token');
  }
},
 _expectKeyword$2: function(word, value) {
  for (var t1 = word.length, i = 0; i < t1; ++i) {
    if (!$.eqB(this._char$0(), $.charCodeAt(word, i)))
      this._error$1('Expected keyword \'' + word + '\'');
    this.position = $.add(this.position, 1);
  }
  return value;
},
 _parseObject$0: function() {
  var object = $.makeLiteralMap([]);
  if (typeof object !== 'object' || object === null || (object.constructor !== Array || !!object.immutable$list) && !object.is$JavaScriptIndexingBehavior())
    return this._parseObject$0$bailout(1, object);
  this.position = $.add(this.position, 1);
  if (this._isToken$1(125) !== true) {
    for (; true;) {
      var key = this._parseString$0();
      if (this._isToken$1(58) !== true)
        this._error$1('Expected \':\' when parsing object');
      this.position = $.add(this.position, 1);
      var t1 = this._parseValue$0();
      if (key !== (key | 0))
        throw $.iae(key);
      if (key < 0 || key >= object.length)
        throw $.ioore(key);
      object[key] = t1;
      if (this._isToken$1(44) !== true)
        break;
      this.position = $.add(this.position, 1);
    }
    if (this._isToken$1(125) !== true)
      this._error$1('Expected \'}\' at end of object');
  }
  this.position = $.add(this.position, 1);
  return object;
},
 _parseObject$0$bailout: function(state, object) {
  this.position = $.add(this.position, 1);
  if (this._isToken$1(125) !== true) {
    for (; true;) {
      var key = this._parseString$0();
      if (this._isToken$1(58) !== true)
        this._error$1('Expected \':\' when parsing object');
      this.position = $.add(this.position, 1);
      $.indexSet(object, key, this._parseValue$0());
      if (this._isToken$1(44) !== true)
        break;
      this.position = $.add(this.position, 1);
    }
    if (this._isToken$1(125) !== true)
      this._error$1('Expected \'}\' at end of object');
  }
  this.position = $.add(this.position, 1);
  return object;
},
 _parseList$0: function() {
  var list = [];
  this.position = $.add(this.position, 1);
  if (this._isToken$1(93) !== true) {
    for (; true;) {
      list.push(this._parseValue$0());
      if (this._isToken$1(44) !== true)
        break;
      this.position = $.add(this.position, 1);
    }
    if (this._isToken$1(93) !== true)
      this._error$1('Expected \']\' at end of list');
  }
  this.position = $.add(this.position, 1);
  return list;
},
 _parseString$0: function() {
  if (this._isToken$1(34) !== true)
    this._error$1('Expected string literal');
  this.position = $.add(this.position, 1);
  var charCodes = $.ListImplementation_List(null, 'int');
  for (var t1 = this.json; true;) {
    var c = this._char$0();
    if ($.eqB(c, 34)) {
      this.position = $.add(this.position, 1);
      break;
    }
    if ($.eqB(c, 92)) {
      this.position = $.add(this.position, 1);
      if ($.eqB(this.position, $.get$length(this)))
        this._error$1('\\ at the end of input');
      switch (this._char$0()) {
        case 34:
          c = 34;
          break;
        case 92:
          c = 92;
          break;
        case 47:
          c = 47;
          break;
        case 98:
          c = 8;
          break;
        case 110:
          c = 10;
          break;
        case 114:
          c = 13;
          break;
        case 102:
          c = 12;
          break;
        case 116:
          c = 9;
          break;
        case 117:
          if ($.gtB($.add(this.position, 5), $.get$length(this)))
            this._error$1('Invalid unicode esacape sequence');
          var codeString = $.substring$2(t1, $.add(this.position, 1), $.add(this.position, 5));
          try {
            c = $.parseInt('0x' + $.S(codeString));
          } catch (exception) {
            $.unwrapException(exception);
            this._error$1('Invalid unicode esacape sequence');
          }

          this.position = $.add(this.position, 4);
          break;
        default:
          this._error$1('Invalid esacape sequence in string literal');
      }
    }
    charCodes.push(c);
    this.position = $.add(this.position, 1);
  }
  return $.StringImplementation_String$fromCharCodes(charCodes);
},
 _parseNumber$0: function() {
  if (this._isToken$1(45) !== true)
    this._error$1('Expected number literal');
  var startPos = this.position;
  var char$ = this._char$0();
  if (char$ === 45)
    char$ = this._nextChar$0();
  if (char$ === 48)
    char$ = this._nextChar$0();
  else if (this._isDigit$1(char$) === true) {
    char$ = this._nextChar$0();
    for (; this._isDigit$1(char$) === true;)
      char$ = this._nextChar$0();
  } else
    this._error$1('Expected digit when parsing number');
  if (char$ === 46) {
    char$ = this._nextChar$0();
    if (this._isDigit$1(char$) === true) {
      char$ = this._nextChar$0();
      for (; this._isDigit$1(char$) === true;)
        char$ = this._nextChar$0();
      var isInt = false;
    } else {
      this._error$1('Expected digit following comma');
      isInt = true;
    }
  } else
    isInt = true;
  if (char$ === 101 || char$ === 69) {
    char$ = this._nextChar$0();
    if (char$ === 45 || char$ === 43)
      char$ = this._nextChar$0();
    if (this._isDigit$1(char$) === true) {
      char$ = this._nextChar$0();
      for (; this._isDigit$1(char$) === true;)
        char$ = this._nextChar$0();
      isInt = false;
    } else
      this._error$1('Expected digit following \'e\' or \'E\'');
  }
  var number = $.substring$2(this.json, startPos, this.position);
  if (isInt)
    return $.parseInt(number);
  else
    return $.parseDouble(number);
},
 _isDigit$1: function(char$) {
  if (typeof char$ !== 'number')
    return this._isDigit$1$bailout(1, char$);
  return char$ >= 48 && char$ <= 57;
},
 _isDigit$1$bailout: function(state, char$) {
  return $.geB(char$, 48) && $.leB(char$, 57);
},
 _isToken$1: function(tokenKind) {
  var t1 = this._token$0();
  if (typeof t1 !== 'number')
    return this._isToken$1$bailout(1, tokenKind, t1);
  return t1 === tokenKind;
},
 _isToken$1$bailout: function(state, tokenKind, t1) {
  return $.eq(t1, tokenKind);
},
 _char$0: function() {
  var t1 = this.position;
  if (typeof t1 !== 'number')
    return this._char$0$bailout(1, t1, 0);
  var t3 = $.get$length(this);
  if (typeof t3 !== 'number')
    return this._char$0$bailout(2, t1, t3);
  if (t1 >= t3)
    this._error$1('Unexpected end of JSON stream');
  return $.charCodeAt(this.json, this.position);
},
 _char$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.position;
    case 1:
      state = 0;
      var t3 = $.get$length(this);
    case 2:
      state = 0;
      if ($.geB(t1, t3))
        this._error$1('Unexpected end of JSON stream');
      return $.charCodeAt(this.json, this.position);
  }
},
 _nextChar$0: function() {
  var t1 = this.position;
  if (typeof t1 !== 'number')
    return this._nextChar$0$bailout(1, t1, 0);
  this.position = t1 + 1;
  t1 = this.position;
  if (typeof t1 !== 'number')
    return this._nextChar$0$bailout(2, t1, 0);
  var t3 = $.get$length(this);
  if (typeof t3 !== 'number')
    return this._nextChar$0$bailout(3, t1, t3);
  if (t1 >= t3)
    return 0;
  return $.charCodeAt(this.json, this.position);
},
 _nextChar$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.position;
    case 1:
      state = 0;
      this.position = $.add(t1, 1);
      t1 = this.position;
    case 2:
      state = 0;
      var t3 = $.get$length(this);
    case 3:
      state = 0;
      if ($.geB(t1, t3))
        return 0;
      return $.charCodeAt(this.json, this.position);
  }
},
 _token$0: function() {
  for (var t1 = this.json; true;) {
    if ($.geB(this.position, $.get$length(this)))
      return;
    var char$ = $.charCodeAt(t1, this.position);
    var token = $.index($._JsonParser_tokens, char$);
    if (token === 32) {
      this.position = $.add(this.position, 1);
      continue;
    }
    if (token == null)
      return 0;
    return token;
  }
},
 _error$1: function(message) {
  throw $.captureStackTrace(message);
},
 _JsonParser$_internal$1: function(json) {
  if (!($._JsonParser_tokens == null))
    return;
  $._JsonParser_tokens = $.ListImplementation_List(126, 'int');
  $.indexSet($._JsonParser_tokens, 9, 32);
  $.indexSet($._JsonParser_tokens, 10, 32);
  $.indexSet($._JsonParser_tokens, 13, 32);
  $.indexSet($._JsonParser_tokens, 32, 32);
  $.indexSet($._JsonParser_tokens, 48, 45);
  $.indexSet($._JsonParser_tokens, 49, 45);
  $.indexSet($._JsonParser_tokens, 50, 45);
  $.indexSet($._JsonParser_tokens, 51, 45);
  $.indexSet($._JsonParser_tokens, 52, 45);
  $.indexSet($._JsonParser_tokens, 53, 45);
  $.indexSet($._JsonParser_tokens, 54, 45);
  $.indexSet($._JsonParser_tokens, 55, 45);
  $.indexSet($._JsonParser_tokens, 56, 45);
  $.indexSet($._JsonParser_tokens, 57, 45);
  $.indexSet($._JsonParser_tokens, 45, 45);
  $.indexSet($._JsonParser_tokens, 123, 123);
  $.indexSet($._JsonParser_tokens, 125, 125);
  $.indexSet($._JsonParser_tokens, 91, 91);
  $.indexSet($._JsonParser_tokens, 93, 93);
  $.indexSet($._JsonParser_tokens, 34, 34);
  $.indexSet($._JsonParser_tokens, 58, 58);
  $.indexSet($._JsonParser_tokens, 44, 44);
  $.indexSet($._JsonParser_tokens, 110, 110);
  $.indexSet($._JsonParser_tokens, 116, 116);
  $.indexSet($._JsonParser_tokens, 102, 102);
}
};

$$.Keyword = {"":
 ["syntax?", "isPseudo", "info?"],
 "super": "Object",
 hashCode$0: function() {
  return $.hashCode(this.syntax);
},
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$SourceString && $.eqB(this.toString$0(), other.slowToString$0());
},
 iterator$0: function() {
  return $.StringCodeIterator$(this.syntax);
},
 toString$0: function() {
  return this.syntax;
},
 slowToString$0: function() {
  return this.syntax;
},
 get$stringValue: function() {
  return this.syntax;
},
 isEmpty$0: function() {
  return false;
},
 is$SourceString: true
};

$$.KeywordState = {"":
 [],
 "super": "Object"
};

$$.ArrayKeywordState = {"":
 ["table", "keyword?"],
 "super": "KeywordState",
 next$1: function(c) {
  return $.index(this.table, $.sub(c, 97));
},
 get$next: function() { return new $.BoundClosure0(this, 'next$1'); },
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  sb.add$1('[');
  var t1 = this.keyword;
  if (!(t1 == null)) {
    sb.add$1('*');
    sb.add$1(t1);
    sb.add$1(' ');
  }
  var foo = this.table;
  if (typeof foo !== 'string' && (typeof foo !== 'object' || foo === null || foo.constructor !== Array && !foo.is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(1, foo, sb);
  for (var i = 0; t1 = foo.length, i < t1; ++i) {
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    if (!(foo[i] == null)) {
      t1 = $.S($.StringImplementation_String$fromCharCodes([i + 97])) + ': ';
      if (i < 0 || i >= foo.length)
        throw $.ioore(i);
      sb.add$1(t1 + $.S(foo[i]) + '; ');
    }
  }
  sb.add$1(']');
  return sb.toString$0();
},
 toString$0$bailout: function(state, foo, sb) {
  for (var i = 0; $.ltB(i, $.get$length(foo)); ++i)
    if (!($.index(foo, i) == null))
      sb.add$1($.S($.StringImplementation_String$fromCharCodes([i + 97])) + ': ' + $.S($.index(foo, i)) + '; ');
  sb.add$1(']');
  return sb.toString$0();
}
};

$$.LeafKeywordState = {"":
 ["keyword?"],
 "super": "KeywordState",
 next$1: function(c) {
  return;
},
 get$next: function() { return new $.BoundClosure0(this, 'next$1'); },
 toString$0: function() {
  return this.keyword.get$syntax();
}
};

$$.AbstractScanner = {"":
 [],
 "super": "Object",
 tokenize$0: function() {
  var next = this.advance$0();
  for (; !(next === 0);)
    next = this.bigSwitch$1(next);
  this.appendEofToken$0();
  return this.firstToken$0();
},
 bigSwitch$1: function(next) {
  if (typeof next !== 'number')
    return this.bigSwitch$1$bailout(1, next);
  this.beginToken$0();
  if (next === 9 || next === 10 || next === 13 || next === 32) {
    this.appendWhiteSpace$1(next);
    return this.advance$0();
  }
  if (97 <= next && next <= 122)
    return this.tokenizeKeywordOrIdentifier$2(next, true);
  if (65 <= next && next <= 90 || next === 95 || next === 36)
    return this.tokenizeIdentifier$3(next, this.get$byteOffset(), true);
  if (next === 60)
    return this.tokenizeLessThan$1(next);
  if (next === 62)
    return this.tokenizeGreaterThan$1(next);
  if (next === 61)
    return this.tokenizeEquals$1(next);
  if (next === 33)
    return this.tokenizeExclamation$1(next);
  if (next === 43)
    return this.tokenizePlus$1(next);
  if (next === 45)
    return this.tokenizeMinus$1(next);
  if (next === 42)
    return this.tokenizeMultiply$1(next);
  if (next === 37)
    return this.tokenizePercent$1(next);
  if (next === 38)
    return this.tokenizeAmpersand$1(next);
  if (next === 124)
    return this.tokenizeBar$1(next);
  if (next === 94)
    return this.tokenizeCaret$1(next);
  if (next === 91)
    return this.tokenizeOpenSquareBracket$1(next);
  if (next === 126)
    return this.tokenizeTilde$1(next);
  if (next === 92) {
    this.appendPrecedenceToken$1($.CTC30);
    return this.advance$0();
  }
  if (next === 35)
    return this.tokenizeTag$1(next);
  if (next === 40) {
    this.appendBeginGroup$2($.CTC32, '(');
    return this.advance$0();
  }
  if (next === 41)
    return this.appendEndGroup$3($.CTC34, ')', 40);
  if (next === 44) {
    this.appendPrecedenceToken$1($.CTC36);
    return this.advance$0();
  }
  if (next === 58) {
    this.appendPrecedenceToken$1($.CTC38);
    return this.advance$0();
  }
  if (next === 59) {
    this.appendPrecedenceToken$1($.CTC40);
    this.discardOpenLt$0();
    return this.advance$0();
  }
  if (next === 63) {
    this.appendPrecedenceToken$1($.CTC42);
    return this.advance$0();
  }
  if (next === 93)
    return this.appendEndGroup$3($.CTC44, ']', 91);
  if (next === 96) {
    this.appendPrecedenceToken$1($.CTC46);
    return this.advance$0();
  }
  if (next === 123) {
    this.appendBeginGroup$2($.CTC48, '{');
    return this.advance$0();
  }
  if (next === 125)
    return this.appendEndGroup$3($.CTC50, '}', 123);
  if (next === 47)
    return this.tokenizeSlashOrComment$1(next);
  if (next === 64)
    return this.tokenizeAtOrRawString$1(next);
  if (next === 34 || next === 39)
    return this.tokenizeString$3(next, this.get$byteOffset(), false);
  if (next === 46)
    return this.tokenizeDotsOrNumber$1(next);
  if (next === 48)
    return this.tokenizeHexOrNumber$1(next);
  if (next === 49 || next === 50 || next === 51 || next === 52 || next === 53 || next === 54 || next === 55 || next === 56 || next === 57)
    return this.tokenizeNumber$1(next);
  if (next === 0)
    return 0;
  if (next < 31)
    throw $.captureStackTrace($.MalformedInputException$('illegal character ' + $.S(next), this.get$charOffset()));
  if (next === 160) {
    this.appendWhiteSpace$1(next);
    return this.advance$0();
  }
  return this.tokenizeIdentifier$3(next, this.get$byteOffset(), true);
},
 bigSwitch$1$bailout: function(state, next) {
  this.beginToken$0();
  if (next === 9 || next === 10 || next === 13 || next === 32) {
    this.appendWhiteSpace$1(next);
    return this.advance$0();
  }
  if ($.leB(97, next) && $.leB(next, 122))
    return this.tokenizeKeywordOrIdentifier$2(next, true);
  if ($.leB(65, next) && $.leB(next, 90) || next === 95 || next === 36)
    return this.tokenizeIdentifier$3(next, this.get$byteOffset(), true);
  if (next === 60)
    return this.tokenizeLessThan$1(next);
  if (next === 62)
    return this.tokenizeGreaterThan$1(next);
  if (next === 61)
    return this.tokenizeEquals$1(next);
  if (next === 33)
    return this.tokenizeExclamation$1(next);
  if (next === 43)
    return this.tokenizePlus$1(next);
  if (next === 45)
    return this.tokenizeMinus$1(next);
  if (next === 42)
    return this.tokenizeMultiply$1(next);
  if (next === 37)
    return this.tokenizePercent$1(next);
  if (next === 38)
    return this.tokenizeAmpersand$1(next);
  if (next === 124)
    return this.tokenizeBar$1(next);
  if (next === 94)
    return this.tokenizeCaret$1(next);
  if (next === 91)
    return this.tokenizeOpenSquareBracket$1(next);
  if (next === 126)
    return this.tokenizeTilde$1(next);
  if (next === 92) {
    this.appendPrecedenceToken$1($.CTC30);
    return this.advance$0();
  }
  if (next === 35)
    return this.tokenizeTag$1(next);
  if (next === 40) {
    this.appendBeginGroup$2($.CTC32, '(');
    return this.advance$0();
  }
  if (next === 41)
    return this.appendEndGroup$3($.CTC34, ')', 40);
  if (next === 44) {
    this.appendPrecedenceToken$1($.CTC36);
    return this.advance$0();
  }
  if (next === 58) {
    this.appendPrecedenceToken$1($.CTC38);
    return this.advance$0();
  }
  if (next === 59) {
    this.appendPrecedenceToken$1($.CTC40);
    this.discardOpenLt$0();
    return this.advance$0();
  }
  if (next === 63) {
    this.appendPrecedenceToken$1($.CTC42);
    return this.advance$0();
  }
  if (next === 93)
    return this.appendEndGroup$3($.CTC44, ']', 91);
  if (next === 96) {
    this.appendPrecedenceToken$1($.CTC46);
    return this.advance$0();
  }
  if (next === 123) {
    this.appendBeginGroup$2($.CTC48, '{');
    return this.advance$0();
  }
  if (next === 125)
    return this.appendEndGroup$3($.CTC50, '}', 123);
  if (next === 47)
    return this.tokenizeSlashOrComment$1(next);
  if (next === 64)
    return this.tokenizeAtOrRawString$1(next);
  if (next === 34 || next === 39)
    return this.tokenizeString$3(next, this.get$byteOffset(), false);
  if (next === 46)
    return this.tokenizeDotsOrNumber$1(next);
  if (next === 48)
    return this.tokenizeHexOrNumber$1(next);
  if (next === 49 || next === 50 || next === 51 || next === 52 || next === 53 || next === 54 || next === 55 || next === 56 || next === 57)
    return this.tokenizeNumber$1(next);
  if (next === 0)
    return 0;
  if ($.ltB(next, 31))
    throw $.captureStackTrace($.MalformedInputException$('illegal character ' + $.S(next), this.get$charOffset()));
  if (next === 160) {
    this.appendWhiteSpace$1(next);
    return this.advance$0();
  }
  return this.tokenizeIdentifier$3(next, this.get$byteOffset(), true);
},
 tokenizeTag$1: function(next) {
  if (this.get$byteOffset() === 0)
    if (this.peek$0() === 33) {
      do
        next = this.advance$0();
      while (!(next === 10) && !(next === 13) && !(next === 0));
      return next;
    }
  this.appendPrecedenceToken$1($.CTC78);
  return this.advance$0();
},
 tokenizeTilde$1: function(next) {
  next = this.advance$0();
  if (next === 47)
    return this.select$3(61, $.CTC80, $.CTC82);
  else {
    this.appendPrecedenceToken$1($.CTC84);
    return next;
  }
},
 tokenizeOpenSquareBracket$1: function(next) {
  next = this.advance$0();
  if (next === 93) {
    var token = this.previousToken$0();
    if (typeof token === 'object' && token !== null && !!token.is$KeywordToken && $.eqB(token.value, $.CTC87))
      return this.select$3(61, $.CTC89, $.CTC91);
  }
  this.appendBeginGroup$2($.CTC93, '[');
  return next;
},
 tokenizeCaret$1: function(next) {
  return this.select$3(61, $.CTC95, $.CTC97);
},
 tokenizeBar$1: function(next) {
  next = this.advance$0();
  if (next === 124) {
    this.appendPrecedenceToken$1($.CTC99);
    return this.advance$0();
  } else if (next === 61) {
    this.appendPrecedenceToken$1($.CTC101);
    return this.advance$0();
  } else {
    this.appendPrecedenceToken$1($.CTC103);
    return next;
  }
},
 tokenizeAmpersand$1: function(next) {
  next = this.advance$0();
  if (next === 38) {
    this.appendPrecedenceToken$1($.CTC105);
    return this.advance$0();
  } else if (next === 61) {
    this.appendPrecedenceToken$1($.CTC107);
    return this.advance$0();
  } else {
    this.appendPrecedenceToken$1($.CTC109);
    return next;
  }
},
 tokenizePercent$1: function(next) {
  return this.select$3(61, $.CTC111, $.CTC113);
},
 tokenizeMultiply$1: function(next) {
  return this.select$3(61, $.CTC115, $.CTC117);
},
 tokenizeMinus$1: function(next) {
  next = this.advance$0();
  if (next === 45) {
    this.appendPrecedenceToken$1($.CTC119);
    return this.advance$0();
  } else if (next === 61) {
    this.appendPrecedenceToken$1($.CTC121);
    return this.advance$0();
  } else {
    this.appendPrecedenceToken$1($.CTC123);
    return next;
  }
},
 tokenizePlus$1: function(next) {
  next = this.advance$0();
  if (43 === next) {
    this.appendPrecedenceToken$1($.CTC125);
    return this.advance$0();
  } else if (61 === next) {
    this.appendPrecedenceToken$1($.CTC127);
    return this.advance$0();
  } else {
    this.appendPrecedenceToken$1($.CTC129);
    return next;
  }
},
 tokenizeExclamation$1: function(next) {
  next = this.advance$0();
  if (next === 61)
    return this.select$3(61, $.CTC131, $.CTC133);
  this.appendPrecedenceToken$1($.CTC135);
  return next;
},
 tokenizeEquals$1: function(next) {
  this.discardOpenLt$0();
  next = this.advance$0();
  if (next === 61)
    return this.select$3(61, $.CTC137, $.CTC139);
  else if (next === 62) {
    this.appendPrecedenceToken$1($.CTC141);
    return this.advance$0();
  }
  this.appendPrecedenceToken$1($.CTC143);
  return next;
},
 tokenizeGreaterThan$1: function(next) {
  next = this.advance$0();
  if (61 === next) {
    this.appendPrecedenceToken$1($.CTC145);
    return this.advance$0();
  } else if (62 === next) {
    next = this.advance$0();
    if (61 === next) {
      this.appendPrecedenceToken$1($.CTC147);
      return this.advance$0();
    } else if (62 === next) {
      next = this.advance$0();
      if (next === 61) {
        this.appendPrecedenceToken$1($.CTC149);
        return this.advance$0();
      } else {
        this.appendGtGtGt$2($.CTC151, '>>>');
        return next;
      }
    } else {
      this.appendGtGt$2($.CTC153, '>>');
      return next;
    }
  } else {
    this.appendGt$2($.CTC155, '>');
    return next;
  }
},
 tokenizeLessThan$1: function(next) {
  next = this.advance$0();
  if (61 === next) {
    this.appendPrecedenceToken$1($.CTC157);
    return this.advance$0();
  } else if (60 === next)
    return this.select$3(61, $.CTC159, $.CTC161);
  else {
    this.appendBeginGroup$2($.CTC163, '<');
    return next;
  }
},
 tokenizeNumber$1: function(next) {
  if (typeof next !== 'number')
    return this.tokenizeNumber$1$bailout(1, next);
  var start = this.get$byteOffset();
  for (; true;) {
    next = this.advance$0();
    if ($.leB(48, next) && $.leB(next, 57))
      continue;
    else if (next === 46)
      return this.tokenizeFractionPart$2(this.advance$0(), start);
    else if (next === 101 || next === 69 || next === 100 || next === 68)
      return this.tokenizeFractionPart$2(next, start);
    else {
      this.appendByteStringToken$2($.CTC52, this.asciiString$2(start, 0));
      return next;
    }
  }
},
 tokenizeNumber$1$bailout: function(state, next) {
  var start = this.get$byteOffset();
  for (; true;) {
    next = this.advance$0();
    if ($.leB(48, next) && $.leB(next, 57))
      continue;
    else if (next === 46)
      return this.tokenizeFractionPart$2(this.advance$0(), start);
    else if (next === 101 || next === 69 || next === 100 || next === 68)
      return this.tokenizeFractionPart$2(next, start);
    else {
      this.appendByteStringToken$2($.CTC52, this.asciiString$2(start, 0));
      return next;
    }
  }
},
 tokenizeHexOrNumber$1: function(next) {
  var x = this.peek$0();
  if (x === 120 || x === 88) {
    this.advance$0();
    return this.tokenizeHex$1(x);
  }
  return this.tokenizeNumber$1(next);
},
 tokenizeHex$1: function(next) {
  if (typeof next !== 'number')
    return this.tokenizeHex$1$bailout(1, next);
  var start = $.sub(this.get$byteOffset(), 1);
  for (var hasDigits = false; true;) {
    next = this.advance$0();
    if (!($.leB(48, next) && $.leB(next, 57)))
      if (!($.leB(65, next) && $.leB(next, 70)))
        var t1 = $.leB(97, next) && $.leB(next, 102);
      else
        t1 = true;
    else
      t1 = true;
    if (t1)
      ;
    else {
      if (!hasDigits)
        throw $.captureStackTrace($.MalformedInputException$('hex digit expected', this.get$charOffset()));
      this.appendByteStringToken$2($.CTC62, this.asciiString$2(start, 0));
      return next;
    }
    hasDigits = true;
  }
},
 tokenizeHex$1$bailout: function(state, next) {
  var start = $.sub(this.get$byteOffset(), 1);
  for (var hasDigits = false; true;) {
    next = this.advance$0();
    if (!($.leB(48, next) && $.leB(next, 57)))
      if (!($.leB(65, next) && $.leB(next, 70)))
        var t1 = $.leB(97, next) && $.leB(next, 102);
      else
        t1 = true;
    else
      t1 = true;
    if (t1)
      ;
    else {
      if (!hasDigits)
        throw $.captureStackTrace($.MalformedInputException$('hex digit expected', this.get$charOffset()));
      this.appendByteStringToken$2($.CTC62, this.asciiString$2(start, 0));
      return next;
    }
    hasDigits = true;
  }
},
 tokenizeDotsOrNumber$1: function(next) {
  var start = this.get$byteOffset();
  next = this.advance$0();
  if ($.leB(48, next) && $.leB(next, 57))
    return this.tokenizeFractionPart$2(next, start);
  else if (46 === next)
    return this.select$3(46, $.CTC54, $.CTC56);
  else {
    this.appendPrecedenceToken$1($.CTC58);
    return next;
  }
},
 tokenizeFractionPart$2: function(next, start) {
  if (typeof next !== 'number')
    return this.tokenizeFractionPart$2$bailout(1, next, start);
  $LOOP$0:
    for (var done = false, hasDigit = false; !done;) {
      if ($.leB(48, next) && $.leB(next, 57))
        ;
      else if (101 === next || 69 === next) {
        next = this.tokenizeExponent$1(this.advance$0());
        done = true;
        hasDigit = true;
        continue $LOOP$0;
      } else {
        done = true;
        continue $LOOP$0;
      }
      next = this.advance$0();
      hasDigit = true;
    }
  if (!hasDigit) {
    this.appendByteStringToken$2($.CTC52, this.asciiString$2(start, -1));
    if (46 === next)
      return this.select$3(46, $.CTC54, $.CTC56);
    this.appendPrecedenceToken$1($.CTC58);
    return this.bigSwitch$1(next);
  }
  if (next === 100 || next === 68)
    next = this.advance$0();
  this.appendByteStringToken$2($.CTC60, this.asciiString$2(start, 0));
  return next;
},
 tokenizeFractionPart$2$bailout: function(state, next, start) {
  $LOOP$0:
    for (var done = false, hasDigit = false; !done;) {
      if ($.leB(48, next) && $.leB(next, 57))
        ;
      else if (101 === next || 69 === next) {
        next = this.tokenizeExponent$1(this.advance$0());
        done = true;
        hasDigit = true;
        continue $LOOP$0;
      } else {
        done = true;
        continue $LOOP$0;
      }
      next = this.advance$0();
      hasDigit = true;
    }
  if (!hasDigit) {
    this.appendByteStringToken$2($.CTC52, this.asciiString$2(start, -1));
    if (46 === next)
      return this.select$3(46, $.CTC54, $.CTC56);
    this.appendPrecedenceToken$1($.CTC58);
    return this.bigSwitch$1(next);
  }
  if (next === 100 || next === 68)
    next = this.advance$0();
  this.appendByteStringToken$2($.CTC60, this.asciiString$2(start, 0));
  return next;
},
 tokenizeExponent$1: function(next) {
  if (typeof next !== 'number')
    return this.tokenizeExponent$1$bailout(1, next);
  if (next === 43 || next === 45) {
    next = this.advance$0();
    if (typeof next !== 'number')
      return this.tokenizeExponent$1$bailout(2, next);
  }
  for (var hasDigits = false; true;) {
    if (48 <= next && next <= 57)
      ;
    else {
      if (!hasDigits)
        throw $.captureStackTrace($.MalformedInputException$('digit expected', this.get$charOffset()));
      return next;
    }
    next = this.advance$0();
    if (typeof next !== 'number')
      return this.tokenizeExponent$1$bailout(3, next);
    hasDigits = true;
  }
},
 tokenizeExponent$1$bailout: function(state, env0) {
  switch (state) {
    case 1:
      var next = env0;
      break;
    case 2:
      next = env0;
      break;
    case 3:
      next = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      if (state === 2 || state === 0 && (next === 43 || next === 45))
        switch (state) {
          case 0:
            next = this.advance$0();
          case 2:
            state = 0;
        }
      var hasDigits = false;
    case 3:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!true)
                break L0;
              if ($.leB(48, next) && $.leB(next, 57))
                ;
              else {
                if (!hasDigits)
                  throw $.captureStackTrace($.MalformedInputException$('digit expected', this.get$charOffset()));
                return next;
              }
              next = this.advance$0();
            case 3:
              state = 0;
              hasDigits = true;
          }
  }
},
 tokenizeSlashOrComment$1: function(next) {
  next = this.advance$0();
  if (42 === next)
    return this.tokenizeMultiLineComment$1(next);
  else if (47 === next)
    return this.tokenizeSingleLineComment$1(next);
  else if (61 === next) {
    this.appendPrecedenceToken$1($.CTC72);
    return this.advance$0();
  } else {
    this.appendPrecedenceToken$1($.CTC74);
    return next;
  }
},
 tokenizeSingleLineComment$1: function(next) {
  for (; true;) {
    next = this.advance$0();
    if (10 === next || 13 === next || 0 === next) {
      this.appendComment$0();
      return next;
    }
  }
},
 tokenizeMultiLineComment$1: function(next) {
  next = this.advance$0();
  for (var nesting = 1; true;)
    if (0 === next)
      return next;
    else if (42 === next) {
      next = this.advance$0();
      if (47 === next) {
        --nesting;
        if (0 === nesting) {
          next = this.advance$0();
          this.appendComment$0();
          return next;
        } else
          next = this.advance$0();
      }
    } else if (47 === next) {
      next = this.advance$0();
      if (42 === next) {
        next = this.advance$0();
        ++nesting;
      }
    } else
      next = this.advance$0();
},
 tokenizeKeywordOrIdentifier$2: function(next, allowDollar) {
  if (typeof next !== 'number')
    return this.tokenizeKeywordOrIdentifier$2$bailout(1, next, allowDollar);
  var state = $.KeywordState_KEYWORD_STATE();
  var start = this.get$byteOffset();
  while (true) {
    var t1 = !(state == null);
    if (!(t1 && $.leB(97, next) && $.leB(next, 122)))
      break;
    state = state.next$1(next);
    next = this.advance$0();
  }
  if (state == null || state.get$keyword() == null)
    return this.tokenizeIdentifier$3(next, start, allowDollar);
  if (!($.leB(65, next) && $.leB(next, 90)))
    t1 = $.leB(48, next) && $.leB(next, 57) || next === 95 || next === 36;
  else
    t1 = true;
  if (t1)
    return this.tokenizeIdentifier$3(next, start, allowDollar);
  else if ($.ltB(next, 128)) {
    this.appendKeywordToken$1(state.get$keyword());
    return next;
  } else
    return this.tokenizeIdentifier$3(next, start, allowDollar);
},
 tokenizeKeywordOrIdentifier$2$bailout: function(state, next, allowDollar) {
  var state = $.KeywordState_KEYWORD_STATE();
  var start = this.get$byteOffset();
  while (true) {
    var t1 = !(state == null);
    if (!(t1 && $.leB(97, next) && $.leB(next, 122)))
      break;
    state = state.next$1(next);
    next = this.advance$0();
  }
  if (state == null || state.get$keyword() == null)
    return this.tokenizeIdentifier$3(next, start, allowDollar);
  if (!($.leB(65, next) && $.leB(next, 90)))
    t1 = $.leB(48, next) && $.leB(next, 57) || next === 95 || next === 36;
  else
    t1 = true;
  if (t1)
    return this.tokenizeIdentifier$3(next, start, allowDollar);
  else if ($.ltB(next, 128)) {
    this.appendKeywordToken$1(state.get$keyword());
    return next;
  } else
    return this.tokenizeIdentifier$3(next, start, allowDollar);
},
 tokenizeIdentifier$3: function(next, start, allowDollar) {
  if (typeof next !== 'number')
    return this.tokenizeIdentifier$3$bailout(1, next, start, allowDollar);
  for (var isAscii = true; true;) {
    if (!($.leB(97, next) && $.leB(next, 122)))
      if (!($.leB(65, next) && $.leB(next, 90)))
        if (!($.leB(48, next) && $.leB(next, 57)))
          if (!(next === 95))
            var t1 = next === 36 && allowDollar;
          else
            t1 = true;
        else
          t1 = true;
      else
        t1 = true;
    else
      t1 = true;
    if (t1)
      next = this.advance$0();
    else {
      if ($.ltB(next, 128)) {
        if (isAscii)
          this.appendByteStringToken$2($.CTC165, this.asciiString$2(start, 0));
        else
          this.appendByteStringToken$2($.CTC165, this.utf8String$2(start, -1));
        return next;
      } else {
        var nonAsciiStart = this.get$byteOffset();
        do
          next = this.nextByte$0();
        while ($.gtB(next, 127));
        var string = this.utf8String$2(nonAsciiStart, -1).slowToString$0();
        var byteLength = $.sub(nonAsciiStart, this.get$byteOffset());
        this.addToCharOffset$1($.sub($.get$length(string), byteLength));
      }
      isAscii = false;
    }
  }
},
 tokenizeIdentifier$3$bailout: function(state, next, start, allowDollar) {
  for (var isAscii = true; true;) {
    if (!($.leB(97, next) && $.leB(next, 122)))
      if (!($.leB(65, next) && $.leB(next, 90)))
        if (!($.leB(48, next) && $.leB(next, 57)))
          if (!(next === 95))
            var t1 = next === 36 && allowDollar;
          else
            t1 = true;
        else
          t1 = true;
      else
        t1 = true;
    else
      t1 = true;
    if (t1)
      next = this.advance$0();
    else {
      if ($.ltB(next, 128)) {
        if (isAscii)
          this.appendByteStringToken$2($.CTC165, this.asciiString$2(start, 0));
        else
          this.appendByteStringToken$2($.CTC165, this.utf8String$2(start, -1));
        return next;
      } else {
        var nonAsciiStart = this.get$byteOffset();
        do
          next = this.nextByte$0();
        while ($.gtB(next, 127));
        var string = this.utf8String$2(nonAsciiStart, -1).slowToString$0();
        var byteLength = $.sub(nonAsciiStart, this.get$byteOffset());
        this.addToCharOffset$1($.sub($.get$length(string), byteLength));
      }
      isAscii = false;
    }
  }
},
 tokenizeAtOrRawString$1: function(next) {
  var start = this.get$byteOffset();
  next = this.advance$0();
  if (next === 34 || next === 39)
    return this.tokenizeString$3(next, start, true);
  else {
    this.appendPrecedenceToken$1($.CTC70);
    return next;
  }
},
 tokenizeString$3: function(next, start, raw) {
  var next0 = this.advance$0();
  if (next == null ? next0 == null : next === next0) {
    next0 = this.advance$0();
    if (next == null ? next0 == null : next === next0)
      return this.tokenizeMultiLineString$3(next, start, raw);
    else {
      this.appendByteStringToken$2($.CTC64, this.utf8String$2(start, -1));
      return next0;
    }
  }
  if (raw)
    return this.tokenizeSingleLineRawString$3(next0, next, start);
  else
    return this.tokenizeSingleLineString$3(next0, next, start);
},
 tokenizeSingleLineString$3: function(next, quoteChar, start) {
  if (typeof next !== 'number')
    return this.tokenizeSingleLineString$3$bailout(1, next, quoteChar, start);
  for (; !(next == null ? quoteChar == null : next === quoteChar);) {
    if (next === 92)
      next = this.advance$0();
    else if (next === 36) {
      next = this.tokenizeStringInterpolation$1(start);
      start = this.get$byteOffset();
      continue;
    }
    if ($.leB(next, 13))
      var t1 = next === 10 || next === 13 || next === 0;
    else
      t1 = false;
    if (t1)
      throw $.captureStackTrace($.MalformedInputException$('unterminated string literal', this.get$charOffset()));
    next = this.advance$0();
  }
  this.appendByteStringToken$2($.CTC64, this.utf8String$2(start, 0));
  return this.advance$0();
},
 tokenizeSingleLineString$3$bailout: function(state, next, quoteChar, start) {
  for (; !(next == null ? quoteChar == null : next === quoteChar);) {
    if (next === 92)
      next = this.advance$0();
    else if (next === 36) {
      next = this.tokenizeStringInterpolation$1(start);
      start = this.get$byteOffset();
      continue;
    }
    if ($.leB(next, 13))
      var t1 = next === 10 || next === 13 || next === 0;
    else
      t1 = false;
    if (t1)
      throw $.captureStackTrace($.MalformedInputException$('unterminated string literal', this.get$charOffset()));
    next = this.advance$0();
  }
  this.appendByteStringToken$2($.CTC64, this.utf8String$2(start, 0));
  return this.advance$0();
},
 tokenizeStringInterpolation$1: function(start) {
  this.appendByteStringToken$2($.CTC64, this.utf8String$2(start, -1));
  this.beginToken$0();
  var next = this.advance$0();
  if (next === 123)
    return this.tokenizeInterpolatedExpression$2(next, start);
  else
    return this.tokenizeInterpolatedIdentifier$2(next, start);
},
 tokenizeInterpolatedExpression$2: function(next, start) {
  this.appendBeginGroup$2($.CTC68, '${');
  this.beginToken$0();
  next = this.advance$0();
  while (true) {
    var t1 = next === 0;
    if (!(!t1 && !(next === 2)))
      break;
    next = this.bigSwitch$1(next);
  }
  if (t1)
    return next;
  next = this.advance$0();
  this.beginToken$0();
  return next;
},
 tokenizeInterpolatedIdentifier$2: function(next, start) {
  this.appendPrecedenceToken$1($.CTC66);
  this.beginToken$0();
  next = this.tokenizeKeywordOrIdentifier$2(next, false);
  this.beginToken$0();
  return next;
},
 tokenizeSingleLineRawString$3: function(next, quoteChar, start) {
  next = this.advance$0();
  if (typeof next !== 'number')
    return this.tokenizeSingleLineRawString$3$bailout(1, quoteChar, start, next);
  for (; !$.eqB(next, 0);) {
    if (next == null ? quoteChar == null : next === quoteChar) {
      this.appendByteStringToken$2($.CTC64, this.utf8String$2(start, 0));
      return this.advance$0();
    } else if (next === 10 || next === 13)
      throw $.captureStackTrace($.MalformedInputException$('unterminated string literal', this.get$charOffset()));
    next = this.advance$0();
  }
  throw $.captureStackTrace($.MalformedInputException$('unterminated string literal', this.get$charOffset()));
},
 tokenizeSingleLineRawString$3$bailout: function(state, quoteChar, start, next) {
  for (; !$.eqB(next, 0);) {
    if (next == null ? quoteChar == null : next === quoteChar) {
      this.appendByteStringToken$2($.CTC64, this.utf8String$2(start, 0));
      return this.advance$0();
    } else if (next === 10 || next === 13)
      throw $.captureStackTrace($.MalformedInputException$('unterminated string literal', this.get$charOffset()));
    next = this.advance$0();
  }
  throw $.captureStackTrace($.MalformedInputException$('unterminated string literal', this.get$charOffset()));
},
 tokenizeMultiLineRawString$2: function(quoteChar, start) {
  var next = this.advance$0();
  $outer$0:
    for (; !(next === 0);) {
      for (; !(next == null ? quoteChar == null : next === quoteChar);) {
        next = this.advance$0();
        if (next === 0)
          break $outer$0;
      }
      next = this.advance$0();
      if (next == null ? quoteChar == null : next === quoteChar) {
        next = this.advance$0();
        if (next == null ? quoteChar == null : next === quoteChar) {
          this.appendByteStringToken$2($.CTC64, this.utf8String$2(start, 0));
          return this.advance$0();
        }
      }
    }
  throw $.captureStackTrace($.MalformedInputException$('unterminated string literal', this.get$charOffset()));
},
 tokenizeMultiLineString$3: function(quoteChar, start, raw) {
  if (raw)
    return this.tokenizeMultiLineRawString$2(quoteChar, start);
  var next = this.advance$0();
  for (; !(next === 0);) {
    if (next === 36) {
      next = this.tokenizeStringInterpolation$1(start);
      start = this.get$byteOffset();
      continue;
    }
    if (next == null ? quoteChar == null : next === quoteChar) {
      next = this.advance$0();
      if (next == null ? quoteChar == null : next === quoteChar) {
        next = this.advance$0();
        if (next == null ? quoteChar == null : next === quoteChar) {
          this.appendByteStringToken$2($.CTC64, this.utf8String$2(start, 0));
          return this.advance$0();
        }
      }
      continue;
    }
    if (next === 92)
      if (this.advance$0() === 0)
        break;
    next = this.advance$0();
  }
  throw $.captureStackTrace($.MalformedInputException$('unterminated string literal', this.get$charOffset()));
}
};

$$.MalformedInputException = {"":
 ["message", "position"],
 "super": "Object",
 toString$0: function() {
  return this.message;
}
};

$$.StringScanner = {"":
 ["string", "tokens", "tail", "tokenStart", "byteOffset", "includeComments", "extraCharOffset", "groupingStack"],
 "super": "ArrayBasedScanner",
 nextByte$0: function() {
  var t1 = this.byteOffset;
  if (typeof t1 !== 'number')
    return this.nextByte$0$bailout(1, t1);
  ++t1;
  this.byteOffset = t1;
  return this.charAt$1(t1);
},
 nextByte$0$bailout: function(state, t1) {
  t1 = $.add(t1, 1);
  this.byteOffset = t1;
  return this.charAt$1(t1);
},
 peek$0: function() {
  return this.charAt$1($.add(this.byteOffset, 1));
},
 charAt$1: function(index) {
  var t1 = this.string;
  return $.gtB($.get$length(t1), index) ? $.charCodeAt(t1, index) : 0;
},
 asciiString$2: function(start, offset) {
  return $.SubstringWrapper$(this.string, start, $.add(this.byteOffset, offset));
},
 utf8String$2: function(start, offset) {
  var t1 = this.string;
  var t2 = this.byteOffset;
  if (typeof t2 !== 'number')
    return this.utf8String$2$bailout(1, start, t2, offset, t1);
  return $.SubstringWrapper$(t1, start, t2 + offset + 1);
},
 utf8String$2$bailout: function(state, start, t2, offset, t1) {
  return $.SubstringWrapper$(t1, start, $.add($.add(t2, offset), 1));
},
 appendByteStringToken$2: function(info, value) {
  var t1 = $.StringToken$fromSource(info, value, this.tokenStart);
  this.tail.set$next(t1);
  this.tail = this.tail.get$next();
}
};

$$.SubstringWrapper = {"":
 ["internalString", "begin", "end"],
 "super": "Object",
 hashCode$0: function() {
  return $.hashCode(this.slowToString$0());
},
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$SourceString && $.eqB(this.slowToString$0(), other.slowToString$0());
},
 slowToString$0: function() {
  return $.substring$2(this.internalString, this.begin, this.end);
},
 toString$0: function() {
  return 'SubstringWrapper(' + $.S(this.slowToString$0()) + ')';
},
 get$stringValue: function() {
  return;
},
 iterator$0: function() {
  return $.StringCodeIterator$substring(this.internalString, this.begin, this.end);
},
 isEmpty$0: function() {
  return $.eq(this.begin, this.end);
},
 is$SourceString: true
};

$$.Token = {"":
 ["info?", "charOffset?", "next="],
 "super": "Object",
 next$0: function() { return this.next.call$0(); },
 next$1: function(arg0) { return this.next.call$1(arg0); },
 get$value: function() {
  return this.info.get$value();
},
 get$stringValue: function() {
  return this.info.get$value().get$stringValue();
},
 get$kind: function() {
  return this.info.get$kind();
},
 toString$0: function() {
  return $.toString(this.info.get$value());
},
 slowToString$0: function() {
  return this.toString$0();
},
 get$slowCharCount: function() {
  return $.get$length(this.slowToString$0());
}
};

$$.KeywordToken = {"":
 ["value?", "info", "charOffset", "next"],
 "super": "Token",
 get$stringValue: function() {
  return this.value.get$syntax();
},
 toString$0: function() {
  return this.value.get$syntax();
},
 is$KeywordToken: true
};

$$.StringToken = {"":
 ["value?", "info", "charOffset", "next"],
 "super": "Token",
 get$stringValue: function() {
  return this.value.get$stringValue();
},
 toString$0: function() {
  return 'StringToken(' + $.S(this.value.slowToString$0()) + ')';
},
 slowToString$0: function() {
  return this.value.slowToString$0();
}
};

$$.StringWrapper = {"":
 ["stringValue?"],
 "super": "Object",
 hashCode$0: function() {
  return $.hashCode(this.stringValue);
},
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$SourceString && $.eqB(this.toString$0(), other.slowToString$0());
},
 iterator$0: function() {
  return $.StringCodeIterator$(this.stringValue);
},
 toString$0: function() {
  return this.stringValue;
},
 slowToString$0: function() {
  return this.stringValue;
},
 isEmpty$0: function() {
  return $.isEmpty(this.stringValue);
},
 is$SourceString: true
};

$$.StringCodeIterator = {"":
 ["string", "index", "end"],
 "super": "Object",
 hasNext$0: function() {
  var t1 = this.index;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this.end;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 < t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.index;
    case 1:
      state = 0;
      var t3 = this.end;
    case 2:
      state = 0;
      return $.lt(t1, t3);
  }
},
 next$0: function() {
  var t1 = this.string;
  var t2 = this.index;
  if (typeof t2 !== 'number')
    return this.next$0$bailout(1, t1, t2);
  this.index = t2 + 1;
  return $.charCodeAt(t1, t2);
},
 next$0$bailout: function(state, t1, t2) {
  this.index = $.add(t2, 1);
  return $.charCodeAt(t1, t2);
},
 get$next: function() { return new $.BoundClosure(this, 'next$0'); },
 StringCodeIterator$substring$3: function(string, index, end) {
}
};

$$.BeginGroupToken = {"":
 ["endGroup!", "value", "info", "charOffset", "next"],
 "super": "StringToken"
};

$$.PrecedenceInfo = {"":
 ["value?", "precedence", "kind?"],
 "super": "Object",
 toString$0: function() {
  return 'PrecedenceInfo(' + $.S(this.value) + ', ' + $.S(this.precedence) + ', ' + $.S(this.kind) + ')';
}
};

$$.ArrayBasedScanner = {"":
 ["tail?", "byteOffset?"],
 "super": "AbstractScanner",
 get$charOffset: function() {
  return $.add(this.byteOffset, this.extraCharOffset);
},
 advance$0: function() {
  return this.nextByte$0();
},
 select$3: function(choice, yes, no) {
  var next = this.advance$0();
  if (next === choice) {
    this.appendPrecedenceToken$1(yes);
    return this.advance$0();
  } else {
    this.appendPrecedenceToken$1(no);
    return next;
  }
},
 appendPrecedenceToken$1: function(info) {
  var t1 = $.Token$(info, this.tokenStart);
  this.tail.set$next(t1);
  this.tail = this.tail.get$next();
},
 appendStringToken$2: function(info, value) {
  var t1 = $.StringToken$(info, value, this.tokenStart);
  this.tail.set$next(t1);
  this.tail = this.tail.get$next();
},
 appendKeywordToken$1: function(keyword) {
  var syntax = keyword.get$syntax();
  if (syntax === 'this' || syntax === 'super')
    this.discardOpenLt$0();
  var t1 = $.KeywordToken$(keyword, this.tokenStart);
  this.tail.set$next(t1);
  this.tail = this.tail.get$next();
},
 appendEofToken$0: function() {
  var t1 = $.Token$($.CTC28, this.get$charOffset());
  this.tail.set$next(t1);
  this.tail = this.tail.get$next();
  t1 = this.tail;
  t1.set$next(t1);
  this.discardOpenLt$0();
  if ($.isEmpty(this.groupingStack) !== true) {
    var begin = this.groupingStack.get$head();
    throw $.captureStackTrace($.MalformedInputException$('Unbalanced ' + $.S(begin.get$stringValue()), begin));
  }
},
 beginToken$0: function() {
  this.tokenStart = this.get$charOffset();
},
 firstToken$0: function() {
  return this.tokens.get$next();
},
 previousToken$0: function() {
  return this.tail;
},
 addToCharOffset$1: function(offset) {
  if (typeof offset !== 'number')
    return this.addToCharOffset$1$bailout(1, offset, 0);
  var t1 = this.extraCharOffset;
  if (typeof t1 !== 'number')
    return this.addToCharOffset$1$bailout(2, offset, t1);
  this.extraCharOffset = t1 + offset;
},
 addToCharOffset$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var offset = env0;
      break;
    case 2:
      offset = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = this.extraCharOffset;
    case 2:
      state = 0;
      this.extraCharOffset = $.add(t1, offset);
  }
},
 appendWhiteSpace$1: function(next) {
},
 appendBeginGroup$2: function(info, value) {
  var token = $.BeginGroupToken$(info, value, this.tokenStart);
  this.tail.set$next(token);
  this.tail = this.tail.get$next();
  if (!(info.kind === 60))
    this.discardOpenLt$0();
  this.groupingStack = this.groupingStack.prepend$1(token);
},
 appendEndGroup$3: function(info, value, openKind) {
  this.appendStringToken$2(info, value);
  this.discardOpenLt$0();
  if ($.isEmpty(this.groupingStack) === true)
    return this.advance$0();
  var begin = this.groupingStack.get$head();
  if (!(begin.get$kind() === openKind)) {
    if (!(openKind === 123) || !(begin.get$kind() === 128))
      throw $.captureStackTrace($.MalformedInputException$('Unmatched ' + $.S(begin.get$stringValue()), begin));
    begin.set$endGroup(this.tail);
    this.groupingStack = this.groupingStack.get$tail();
    return 2;
  }
  begin.set$endGroup(this.tail);
  this.groupingStack = this.groupingStack.get$tail();
  return this.advance$0();
},
 appendGt$2: function(info, value) {
  this.appendStringToken$2(info, value);
  if ($.isEmpty(this.groupingStack) === true)
    return;
  if (this.groupingStack.get$head().get$kind() === 60) {
    var t1 = this.tail;
    this.groupingStack.get$head().set$endGroup(t1);
    this.groupingStack = this.groupingStack.get$tail();
  }
},
 appendGtGt$2: function(info, value) {
  this.appendStringToken$2(info, value);
  if ($.isEmpty(this.groupingStack) === true)
    return;
  if (this.groupingStack.get$head().get$kind() === 60)
    this.groupingStack = this.groupingStack.get$tail();
  if ($.isEmpty(this.groupingStack) === true)
    return;
  if (this.groupingStack.get$head().get$kind() === 60) {
    var t1 = this.tail;
    this.groupingStack.get$head().set$endGroup(t1);
    this.groupingStack = this.groupingStack.get$tail();
  }
},
 appendGtGtGt$2: function(info, value) {
  this.appendStringToken$2(info, value);
  if ($.isEmpty(this.groupingStack) === true)
    return;
  if (this.groupingStack.get$head().get$kind() === 60)
    this.groupingStack = this.groupingStack.get$tail();
  if ($.isEmpty(this.groupingStack) === true)
    return;
  if (this.groupingStack.get$head().get$kind() === 60)
    this.groupingStack = this.groupingStack.get$tail();
  if ($.isEmpty(this.groupingStack) === true)
    return;
  if (this.groupingStack.get$head().get$kind() === 60) {
    var t1 = this.tail;
    this.groupingStack.get$head().set$endGroup(t1);
    this.groupingStack = this.groupingStack.get$tail();
  }
},
 appendComment$0: function() {
  if (this.includeComments !== true)
    return;
  this.appendByteStringToken$2($.CTC76, this.utf8String$2(this.tokenStart, -1));
},
 discardOpenLt$0: function() {
  while (true) {
    if (!($.isEmpty(this.groupingStack) !== true && this.groupingStack.get$head().get$kind() === 60))
      break;
    this.groupingStack = this.groupingStack.get$tail();
  }
},
 ArrayBasedScanner$1: function(includeComments) {
  this.tail = this.tokens;
}
};

$$.LinkIterator = {"":
 ["current"],
 "super": "Object",
 hasNext$0: function() {
  return $.isEmpty(this.current) !== true;
},
 next$0: function() {
  var result = this.current.get$head();
  this.current = this.current.get$tail();
  return result;
},
 get$next: function() { return new $.BoundClosure(this, 'next$0'); }
};

$$.LinkTail = {"":
 [],
 "super": "Object",
 get$head: function() {
  return;
},
 get$tail: function() {
  return;
},
 prepend$1: function(element) {
  return $.LinkEntry$(element, this, $.getRuntimeTypeInfo(this).T);
},
 iterator$0: function() {
  return $.LinkIterator$(this, $.getRuntimeTypeInfo(this).T);
},
 toString$0: function() {
  return '[]';
},
 isEmpty$0: function() {
  return true;
},
 forEach$1: function(f) {
}
};

$$.LinkEntry = {"":
 ["head?", "tail?"],
 "super": "Object",
 prepend$1: function(element) {
  return $.LinkEntry$(element, this, $.getRuntimeTypeInfo(this).T);
},
 iterator$0: function() {
  return $.LinkIterator$(this, $.getRuntimeTypeInfo(this).T);
},
 printOn$2: function(buffer, separatedBy) {
  buffer.add$1(this.head);
  for (var link = this.tail; $.isEmpty(link) !== true; link = link.get$tail()) {
    buffer.add$1(separatedBy);
    buffer.add$1(link.get$head());
  }
},
 toString$0: function() {
  var buffer = $.StringBufferImpl$('');
  buffer.add$1('[ ');
  this.printOn$2(buffer, ', ');
  buffer.add$1(' ]');
  return buffer.toString$0();
},
 isEmpty$0: function() {
  return false;
},
 forEach$1: function(f) {
  for (var link = this; $.isEmpty(link) !== true; link = link.get$tail())
    f.call$1(link.get$head());
}
};

$$.main_anon = {"":
 [],
 "super": "Closure",
 call$1: function(request) {
  var json = $.JSON_parse(request.get$responseText());
  $.buildNavigation(json);
  $.setupSearch(json);
}
};

$$._convertDartToNative_PrepareForStructuredClone_findSlot = {"":
 ["copies_3", "values_2"],
 "super": "Closure",
 call$1: function(value) {
  var length$ = $.get$length(this.values_2);
  if (typeof length$ !== 'number')
    return this.call$1$bailout(1, value, length$);
  for (var i = 0; i < length$; ++i) {
    var t1 = $.index(this.values_2, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_2, value);
  $.add$1(this.copies_3, null);
  return length$;
},
 call$1$bailout: function(state, value, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var t1 = $.index(this.values_2, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_2, value);
  $.add$1(this.copies_3, null);
  return length$;
}
};

$$._convertDartToNative_PrepareForStructuredClone_readSlot = {"":
 ["copies_4"],
 "super": "Closure",
 call$1: function(i) {
  return $.index(this.copies_4, i);
}
};

$$._convertDartToNative_PrepareForStructuredClone_writeSlot = {"":
 ["copies_5"],
 "super": "Closure",
 call$2: function(i, x) {
  $.indexSet(this.copies_5, i, x);
}
};

$$._convertDartToNative_PrepareForStructuredClone_cleanupSlots = {"":
 [],
 "super": "Closure",
 call$0: function() {
}
};

$$._convertDartToNative_PrepareForStructuredClone_walk = {"":
 ["writeSlot_8", "findSlot_7", "readSlot_6"],
 "super": "Closure",
 call$1: function(e) {
  var t1 = {};
  if (e == null)
    return e;
  if (typeof e === 'boolean')
    return e;
  if (typeof e === 'number')
    return e;
  if (typeof e === 'string')
    return e;
  if (typeof e === 'object' && e !== null && !!e.is$Date)
    throw $.captureStackTrace($.CTC3);
  if (typeof e === 'object' && e !== null && !!e.is$RegExp)
    throw $.captureStackTrace($.CTC4);
  if (typeof e === 'object' && e !== null && e.is$_FileImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$File())
    throw $.captureStackTrace($.CTC5);
  if (typeof e === 'object' && e !== null && e.is$_BlobImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$Blob())
    throw $.captureStackTrace($.CTC6);
  if (typeof e === 'object' && e !== null && e.is$_FileListImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$FileList())
    throw $.captureStackTrace($.CTC7);
  if (typeof e === 'object' && e !== null && e.is$_ImageDataImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ImageData())
    throw $.captureStackTrace($.CTC7);
  if (typeof e === 'object' && e !== null && e.is$_ArrayBufferImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ArrayBuffer())
    throw $.captureStackTrace($.CTC8);
  if (typeof e === 'object' && e !== null && e.is$_ArrayBufferViewImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ArrayBufferView())
    throw $.captureStackTrace($.CTC9);
  if (typeof e === 'object' && e !== null && e.is$Map()) {
    var slot = this.findSlot_7.call$1(e);
    t1.copy_1 = this.readSlot_6.call$1(slot);
    var t2 = t1.copy_1;
    if (!(t2 == null))
      return t2;
    t1.copy_1 = {};
    this.writeSlot_8.call$2(slot, t1.copy_1);
    e.forEach$1(new $._convertDartToNative_PrepareForStructuredClone_walk_anon(this, t1));
    return t1.copy_1;
  }
  if (typeof e === 'object' && e !== null && (e.constructor === Array || e.is$List())) {
    if (typeof e !== 'object' || e === null || (e.constructor !== Array || !!e.immutable$list) && !e.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(1, e, 0, 0, 0, 0, 0);
    var length$ = e.length;
    slot = this.findSlot_7.call$1(e);
    var copy = this.readSlot_6.call$1(slot);
    if (!(copy == null)) {
      if (true === copy) {
        copy = new Array(length$);
        this.writeSlot_8.call$2(slot, copy);
      }
      return copy;
    }
    if (e instanceof Array && !!!(e.immutable$list)) {
      this.writeSlot_8.call$2(slot, true);
      for (var i = 0; i < length$; ++i) {
        if (i < 0 || i >= e.length)
          throw $.ioore(i);
        var element = e[i];
        var elementCopy = this.call$1(element);
        if (!(elementCopy == null ? element == null : elementCopy === element)) {
          copy = this.readSlot_6.call$1(slot);
          if (true === copy) {
            copy = new Array(length$);
            this.writeSlot_8.call$2(slot, copy);
          }
          if (typeof copy !== 'object' || copy === null || (copy.constructor !== Array || !!copy.immutable$list) && !copy.is$JavaScriptIndexingBehavior())
            return this.call$1$bailout(2, copy, i, e, length$, elementCopy, slot);
          for (var j = 0; j < i; ++j) {
            if (j < 0 || j >= e.length)
              throw $.ioore(j);
            t1 = e[j];
            if (j < 0 || j >= copy.length)
              throw $.ioore(j);
            copy[j] = t1;
          }
          if (i < 0 || i >= copy.length)
            throw $.ioore(i);
          copy[i] = elementCopy;
          ++i;
          break;
        }
      }
      if (copy == null) {
        this.writeSlot_8.call$2(slot, e);
        copy = e;
      }
    } else {
      copy = new Array(length$);
      this.writeSlot_8.call$2(slot, copy);
      i = 0;
    }
    if (typeof copy !== 'object' || copy === null || (copy.constructor !== Array || !!copy.immutable$list) && !copy.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(3, e, copy, length$, i, 0, 0);
    for (; i < length$; ++i) {
      if (i < 0 || i >= e.length)
        throw $.ioore(i);
      t1 = this.call$1(e[i]);
      if (i < 0 || i >= copy.length)
        throw $.ioore(i);
      copy[i] = t1;
    }
    return copy;
  }
  throw $.captureStackTrace($.CTC10);
},
 call$1$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var e = env0;
      break;
    case 2:
      copy = env0;
      i = env1;
      e = env2;
      length$ = env3;
      elementCopy = env4;
      slot = env5;
      break;
    case 3:
      e = env0;
      copy = env1;
      length$ = env2;
      i = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = {};
      if (e == null)
        return e;
      if (typeof e === 'boolean')
        return e;
      if (typeof e === 'number')
        return e;
      if (typeof e === 'string')
        return e;
      if (typeof e === 'object' && e !== null && !!e.is$Date)
        throw $.captureStackTrace($.CTC3);
      if (typeof e === 'object' && e !== null && !!e.is$RegExp)
        throw $.captureStackTrace($.CTC4);
      if (typeof e === 'object' && e !== null && e.is$_FileImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$File())
        throw $.captureStackTrace($.CTC5);
      if (typeof e === 'object' && e !== null && e.is$_BlobImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$Blob())
        throw $.captureStackTrace($.CTC6);
      if (typeof e === 'object' && e !== null && e.is$_FileListImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$FileList())
        throw $.captureStackTrace($.CTC7);
      if (typeof e === 'object' && e !== null && e.is$_ImageDataImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ImageData())
        throw $.captureStackTrace($.CTC7);
      if (typeof e === 'object' && e !== null && e.is$_ArrayBufferImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ArrayBuffer())
        throw $.captureStackTrace($.CTC8);
      if (typeof e === 'object' && e !== null && e.is$_ArrayBufferViewImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ArrayBufferView())
        throw $.captureStackTrace($.CTC9);
      if (typeof e === 'object' && e !== null && e.is$Map()) {
        var slot = this.findSlot_7.call$1(e);
        t1.copy_1 = this.readSlot_6.call$1(slot);
        var t2 = t1.copy_1;
        if (!(t2 == null))
          return t2;
        t1.copy_1 = {};
        this.writeSlot_8.call$2(slot, t1.copy_1);
        e.forEach$1(new $._convertDartToNative_PrepareForStructuredClone_walk_anon(this, t1));
        return t1.copy_1;
      }
    default:
      if (state === 3 || state === 2 || state === 1 || state === 0 && typeof e === 'object' && e !== null && (e.constructor === Array || e.is$List()))
        switch (state) {
          case 0:
          case 1:
            state = 0;
            var length$ = $.get$length(e);
            slot = this.findSlot_7.call$1(e);
            var copy = this.readSlot_6.call$1(slot);
            if (!(copy == null)) {
              if (true === copy) {
                copy = new Array(length$);
                this.writeSlot_8.call$2(slot, copy);
              }
              return copy;
            }
          case 2:
            if (state === 2 || state === 0 && e instanceof Array && !!!(e.immutable$list))
              switch (state) {
                case 0:
                  this.writeSlot_8.call$2(slot, true);
                  var i = 0;
                case 2:
                  L0:
                    while (true)
                      switch (state) {
                        case 0:
                          if (!$.ltB(i, length$))
                            break L0;
                          var element = $.index(e, i);
                          var elementCopy = this.call$1(element);
                        case 2:
                          if (state === 2 || state === 0 && !(elementCopy == null ? element == null : elementCopy === element))
                            switch (state) {
                              case 0:
                                copy = this.readSlot_6.call$1(slot);
                                if (true === copy) {
                                  copy = new Array(length$);
                                  this.writeSlot_8.call$2(slot, copy);
                                }
                              case 2:
                                state = 0;
                                for (var j = 0; j < i; ++j)
                                  $.indexSet(copy, j, $.index(e, j));
                                $.indexSet(copy, i, elementCopy);
                                ++i;
                                break L0;
                            }
                          ++i;
                      }
                  if (copy == null) {
                    this.writeSlot_8.call$2(slot, e);
                    copy = e;
                  }
              }
            else {
              copy = new Array(length$);
              this.writeSlot_8.call$2(slot, copy);
              i = 0;
            }
          case 3:
            state = 0;
            for (; $.ltB(i, length$); ++i)
              $.indexSet(copy, i, this.call$1($.index(e, i)));
            return copy;
        }
      throw $.captureStackTrace($.CTC10);
  }
}
};

$$._convertDartToNative_PrepareForStructuredClone_walk_anon = {"":
 ["walk_9", "box_0"],
 "super": "Closure",
 call$2: function(key, value) {
  this.box_0.copy_1[key] = this.walk_9.call$1(value);
}
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 "super": "Closure",
 call$2: function(k, v) {
  if (this.box_0.first_1 !== true)
    $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
}
};

$$._HttpRequestUtils_get_anon = {"":
 ["request_1", "onSuccess_0"],
 "super": "Closure",
 call$1: function(e) {
  if ($.eqB(this.request_1.get$readyState(), 4))
    var t1 = $.eqB(this.request_1.get$status(), 200) || $.eqB(this.request_1.get$status(), 0);
  else
    t1 = false;
  if (t1)
    this.onSuccess_0.call$1(this.request_1);
}
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 "super": "Closure",
 call$0: function() {
  return this.closure_0.call$0();
}
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 "super": "Closure",
 call$0: function() {
  return this.closure_2.call$1(this.arg1_1);
}
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 "super": "Closure",
 call$0: function() {
  return this.closure_5.call$2(this.arg1_4, this.arg2_3);
}
};

$$.enableCodeBlocks_anon = {"":
 ["pre_0"],
 "super": "Closure",
 call$1: function(e) {
  if ($.contains$1(this.pre_0.get$classes(), 'expanded') === true)
    this.pre_0.get$classes().remove$1('expanded');
  else {
    if ($.contains$1(this.pre_0.get$classes(), 'formatted') !== true) {
      var t1 = $.classifySource(this.pre_0.get$text());
      this.pre_0.set$innerHTML(t1);
      $.add$1(this.pre_0.get$classes(), 'formatted');
    }
    $.add$1(this.pre_0.get$classes(), 'expanded');
  }
}
};

$$.setupSearch_anon = {"":
 [],
 "super": "Closure",
 call$1: function(event$) {
  return $.showDropDown();
}
};

$$.setupSearch_anon0 = {"":
 [],
 "super": "Closure",
 call$1: function(event$) {
  return $.hideDropDown();
}
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 "super": "Closure",
 call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
}
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 "super": "Closure",
 call$1: function(entry) {
  this.f_0.call$2(entry.get$key(), entry.get$value());
}
};

$$._convertNativeToDart_AcceptStructuredClone_findSlot = {"":
 ["copies_1", "values_0"],
 "super": "Closure",
 call$1: function(value) {
  var length$ = $.get$length(this.values_0);
  if (typeof length$ !== 'number')
    return this.call$1$bailout(1, value, length$);
  for (var i = 0; i < length$; ++i) {
    var t1 = $.index(this.values_0, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_0, value);
  $.add$1(this.copies_1, null);
  return length$;
},
 call$1$bailout: function(state, value, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var t1 = $.index(this.values_0, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_0, value);
  $.add$1(this.copies_1, null);
  return length$;
}
};

$$._convertNativeToDart_AcceptStructuredClone_readSlot = {"":
 ["copies_2"],
 "super": "Closure",
 call$1: function(i) {
  return $.index(this.copies_2, i);
}
};

$$._convertNativeToDart_AcceptStructuredClone_writeSlot = {"":
 ["copies_3"],
 "super": "Closure",
 call$2: function(i, x) {
  $.indexSet(this.copies_3, i, x);
}
};

$$._convertNativeToDart_AcceptStructuredClone_walk = {"":
 ["writeSlot_6", "findSlot_5", "readSlot_4"],
 "super": "Closure",
 call$1: function(e) {
  if (typeof e !== 'object' || e === null || (e.constructor !== Array || !!e.immutable$list) && !e.is$JavaScriptIndexingBehavior())
    return this.call$1$bailout(1, e, 0, 0);
  if (e instanceof Date)
    throw $.captureStackTrace($.CTC3);
  if (e instanceof RegExp)
    throw $.captureStackTrace($.CTC4);
  if ($._isJavaScriptSimpleObject(e)) {
    var slot = this.findSlot_5.call$1(e);
    var copy = this.readSlot_4.call$1(slot);
    if (!(copy == null))
      return copy;
    copy = $.makeLiteralMap([]);
    if (typeof copy !== 'object' || copy === null || (copy.constructor !== Array || !!copy.immutable$list) && !copy.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(2, e, slot, copy);
    this.writeSlot_6.call$2(slot, copy);
    for (var t1 = $.iterator(Object.keys(e)); t1.hasNext$0() === true;) {
      var t2 = t1.next$0();
      var t3 = this.call$1(e[t2]);
      if (t2 !== (t2 | 0))
        throw $.iae(t2);
      if (t2 < 0 || t2 >= copy.length)
        throw $.ioore(t2);
      copy[t2] = t3;
    }
    return copy;
  }
  if (e instanceof Array) {
    slot = this.findSlot_5.call$1(e);
    copy = this.readSlot_4.call$1(slot);
    if (!(copy == null))
      return copy;
    this.writeSlot_6.call$2(slot, e);
    var length$ = e.length;
    for (var i = 0; i < length$; ++i) {
      if (i < 0 || i >= e.length)
        throw $.ioore(i);
      t1 = this.call$1(e[i]);
      if (i < 0 || i >= e.length)
        throw $.ioore(i);
      e[i] = t1;
    }
    return e;
  }
  return e;
},
 call$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var e = env0;
      break;
    case 2:
      e = env0;
      slot = env1;
      copy = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if (e == null)
        return e;
      if (typeof e === 'boolean')
        return e;
      if (typeof e === 'number')
        return e;
      if (typeof e === 'string')
        return e;
      if (e instanceof Date)
        throw $.captureStackTrace($.CTC3);
      if (e instanceof RegExp)
        throw $.captureStackTrace($.CTC4);
    case 2:
      if (state === 2 || state === 0 && $._isJavaScriptSimpleObject(e))
        switch (state) {
          case 0:
            var slot = this.findSlot_5.call$1(e);
            var copy = this.readSlot_4.call$1(slot);
            if (!(copy == null))
              return copy;
            copy = $.makeLiteralMap([]);
          case 2:
            state = 0;
            this.writeSlot_6.call$2(slot, copy);
            for (var t1 = $.iterator(Object.keys(e)); t1.hasNext$0() === true;) {
              var t2 = t1.next$0();
              $.indexSet(copy, t2, this.call$1(e[t2]));
            }
            return copy;
        }
      if (e instanceof Array) {
        slot = this.findSlot_5.call$1(e);
        copy = this.readSlot_4.call$1(slot);
        if (!(copy == null))
          return copy;
        this.writeSlot_6.call$2(slot, e);
        var length$ = $.get$length(e);
        for (var i = 0; $.ltB(i, length$); ++i)
          $.indexSet(e, i, this.call$1($.index(e, i)));
        return e;
      }
      return e;
  }
}
};

$$._convertNativeToDart_IDBKey_containsDate = {"":
 [],
 "super": "Closure",
 call$1: function(object) {
  if (object instanceof Date)
    return true;
  if (typeof object === 'object' && object !== null && (object.constructor === Array || object.is$List())) {
    if (typeof object !== 'object' || object === null || object.constructor !== Array && !object.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(1, object);
    for (var i = 0; t1 = object.length, i < t1; ++i) {
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      if (this.call$1(object[i]) === true)
        return true;
    }
  }
  return false;
  var t1;
},
 call$1$bailout: function(state, env0) {
  switch (state) {
    case 1:
      var object = env0;
      break;
  }
  switch (state) {
    case 0:
      if (object instanceof Date)
        return true;
    case 1:
      if (state === 1 || state === 0 && typeof object === 'object' && object !== null && (object.constructor === Array || object.is$List()))
        switch (state) {
          case 0:
          case 1:
            state = 0;
            for (var i = 0; $.ltB(i, $.get$length(object)); ++i)
              if (this.call$1($.index(object, i)) === true)
                return true;
        }
      return false;
  }
}
};

$$.FilteredElementList__filtered_anon = {"":
 [],
 "super": "Closure",
 call$1: function(n) {
  return typeof n === 'object' && n !== null && n.is$Element();
}
};

$$._ChildrenElementList_filter_anon = {"":
 ["f_1", "output_0"],
 "super": "Closure",
 call$1: function(element) {
  if (this.f_1.call$1(element) === true)
    $.add$1(this.output_0, element);
}
};

$$.FilteredElementList_removeRange_anon = {"":
 [],
 "super": "Closure",
 call$1: function(el) {
  return el.remove$0();
}
};

$$.buildLibraryNavigation_writeType = {"":
 ["html_0"],
 "super": "Closure",
 call$2: function(icon, typeInfo) {
  $.add$1(this.html_0, '<li>');
  var t1 = $.eqB($.currentType, $.index(typeInfo, 'name'));
  var t2 = this.html_0;
  if (t1)
    $.add$1(t2, '<div class="icon-' + $.S(icon) + '"></div><strong>' + $.S($.getTypeName(typeInfo)) + '</strong>');
  else
    $.add$1(t2, '          <a href="' + $.getTypeUrl($.currentLibrary, typeInfo) + '">\n            <div class="icon-' + $.S(icon) + '"></div>' + $.S($.getTypeName(typeInfo)) + '\n          </a>\n          ');
  $.add$1(this.html_0, '</li>');
}
};

$$.buildLibraryNavigation_anon = {"":
 ["writeType_1"],
 "super": "Closure",
 call$1: function(typeInfo) {
  return this.writeType_1.call$2($.kindToString($.index(typeInfo, 'kind')), typeInfo);
}
};

$$.buildLibraryNavigation_anon0 = {"":
 ["writeType_2"],
 "super": "Closure",
 call$1: function(typeInfo) {
  return this.writeType_2.call$2('exception', typeInfo);
}
};

$$.Result_addRow_clickHandler = {"":
 ["this_0"],
 "super": "Closure",
 call$1: function(event$) {
  var t1 = this.this_0.get$url();
  $.window().get$location().set$href(t1);
  $.hideDropDown();
}
};

$$.Result_addRow_anon = {"":
 [],
 "super": "Closure",
 call$1: function(event$) {
  $.hideDropDownSuspend = true;
  return true;
}
};

$$.Result_addRow_anon0 = {"":
 [],
 "super": "Closure",
 call$1: function(event$) {
  $.hideDropDownSuspend = false;
  return false;
}
};

$$.HashSetImplementation_addAll__ = {"":
 ["this_0"],
 "super": "Closure",
 call$1: function(value) {
  this.this_0.add$1(value);
}
};

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 "super": "Closure",
 call$2: function(key, value) {
  this.f_0.call$1(key);
}
};

$$.HashSetImplementation_filter__ = {"":
 ["f_1", "result_0"],
 "super": "Closure",
 call$2: function(key, value) {
  if (this.f_1.call$1(key) === true)
    $.add$1(this.result_0, key);
}
};

$$._CssClassSet_add_anon = {"":
 ["value_0"],
 "super": "Closure",
 call$1: function(s) {
  return $.add$1(s, this.value_0);
}
};

$$._CssClassSet_addAll_anon = {"":
 ["collection_0"],
 "super": "Closure",
 call$1: function(s) {
  return $.addAll(s, this.collection_0);
}
};

$$._CssClassSet_clear_anon = {"":
 [],
 "super": "Closure",
 call$1: function(s) {
  return $.clear(s);
}
};

$$.ConstantMap_forEach_anon = {"":
 ["this_1", "f_0"],
 "super": "Closure",
 call$1: function(key) {
  return this.f_0.call$2(key, $.index(this.this_1, key));
}
};

$$._DataAttributeMap_getKeys_anon = {"":
 ["this_1", "keys_0"],
 "super": "Closure",
 call$2: function(key, value) {
  if (this.this_1._matches$1(key) === true)
    $.add$1(this.keys_0, this.this_1._strip$1(key));
}
};

$$._DataAttributeMap_forEach_anon = {"":
 ["this_1", "f_0"],
 "super": "Closure",
 call$2: function(key, value) {
  if (this.this_1._matches$1(key) === true)
    this.f_0.call$2(this.this_1._strip$1(key), value);
}
};

$$.KeywordState_KEYWORD_STATE_anon = {"":
 [],
 "super": "Closure",
 call$2: function(a, b) {
  return $.compareTo(a, b);
}
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
call$0: function() { return this.self[this.target](); }
};
$$.BoundClosure0 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$1: function(p0) { return this.self[this.target](p0); }
};
$._InputElementEventsImpl$ = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = other.length;
  if (length$ > receiver.length)
    return false;
  return other == receiver.substring(0, length$);
};

$._CssClassSet$ = function(_element) {
  return new $._CssClassSet(_element);
};

$.getRange = function(receiver, start, length$) {
  if (!$.isJsArray(receiver))
    return receiver.getRange$2(start, length$);
  if (0 === length$)
    return [];
  $.checkNull(start);
  $.checkNull(length$);
  if (!(typeof start === 'number' && start === (start | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var t1 = length$ < 0;
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(length$));
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  return receiver.slice(start, end);
};

$._Lists_getRange = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if (typeof start !== 'number')
    return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if ($.ltB(length$, 0))
    throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  if (typeof length$ !== 'number')
    throw $.iae(length$);
  var end = start + length$;
  if (end > a.length)
    throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; i < end; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    accumulator.push(a[i]);
  }
  return accumulator;
};

$.eqB = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b) === true;
  return a === b;
};

$.classifySource = function(text) {
  var html = $.StringBufferImpl$('');
  var token = $.StringScanner$(text, true).tokenize$0();
  for (var inString = false, whitespaceOffset = 0; !$.eqB(token.get$kind(), 0);) {
    html.add$1($.substring$2(text, whitespaceOffset, token.get$charOffset()));
    var whitespaceOffset0 = $.add(token.get$charOffset(), token.get$slowCharCount());
    switch (token.get$kind()) {
      case 39:
      case 128:
        inString = true;
        break;
    }
    var kind = $.classify(token);
    var escapedText = $.escapeHtml(token.slowToString$0());
    if (!(kind == null)) {
      var stringClass = inString ? 'si' : '';
      html.add$1('<span class="' + $.S(kind) + ' ' + stringClass + '">' + $.S(escapedText) + '</span>');
    } else
      html.add$1(escapedText);
    if ($.eqB(token.get$kind(), 39))
      inString = false;
    token = token.get$next();
    whitespaceOffset = whitespaceOffset0;
  }
  return html.toString$0();
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver)) {
    $.checkNull(newLength);
    if (!(typeof newLength === 'number' && newLength === (newLength | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else
    receiver.set$length(newLength);
  return newLength;
};

$._Device_userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null)
    return;
  var function$ = closure.$identity;
  if (!!function$)
    return function$;
  function$ = function() {
    return $.invokeClosure.call$5(closure, $, arity, arguments[0], arguments[1]);
  };
  closure.$identity = function$;
  return function$;
};

$._TextTrackListEventsImpl$ = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$.getTypeName = function(typeInfo) {
  return typeInfo.containsKey$1('args') === true ? $.S($.index(typeInfo, 'name')) + '&lt;' + $.S($.index(typeInfo, 'name')) + '&gt;' : $.index(typeInfo, 'name');
};

$._MediaStreamTrackEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackEventsImpl(_ptr);
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$.isJsArray = function(value) {
  return !(value == null) && value.constructor === Array;
};

$.matchLibraryMembers = function(results, searchText, library) {
  if (library.containsKey$1('members') === true) {
    var libraryName = $.index(library, 'name');
    for (var t1 = $.iterator($.index(library, 'members')); t1.hasNext$0() === true;) {
      var t2 = t1.next$0();
      var memberMatch = $.obtainMatch(searchText, $.index(t2, 'name'));
      if (!(memberMatch == null))
        results.push($.Result$(memberMatch, $.index(t2, 'kind'), $.getLibraryMemberUrl(libraryName, t2), libraryName, null, null, null));
    }
  }
};

$.clear = function(receiver) {
  if (!$.isJsArray(receiver))
    return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1];
    if (typeof decompiled === 'string')
      name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.stringReplaceJS = function(receiver, replacer, to) {
  return receiver.replace(replacer, to.replace('$', '$$$$'));
};

$.HashSetIterator$ = function(set_, E) {
  var t1 = new $.HashSetIterator(set_.get$_backingMap().get$_keys(), -1);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1.HashSetIterator$1(set_);
  return t1;
};

$.ListIterator$ = function(list, T) {
  var t1 = new $.ListIterator(0, list);
  $.setRuntimeTypeInfo(t1, { 'T': T });
  return t1;
};

$._JavaScriptAudioNodeEventsImpl$ = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$.forEach = function(receiver, f) {
  if (!$.isJsArray(receiver))
    return receiver.forEach$1(f);
  else
    return $.Collections_forEach(receiver, f);
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$.classify = function(token) {
  switch (token.get$kind()) {
    case 1024:
      return 'e';
    case 97:
      var text = token.slowToString$0();
      if ($._looksLikeType(text) || $.eqB(text, 'num') || $.eqB(text, 'bool') || $.eqB(text, 'int') || $.eqB(text, 'double'))
        return 't';
      return 'i';
    case 39:
    case 128:
      return 's';
    case 105:
    case 120:
    case 100:
      return 'n';
    case 161:
      return 'c';
    case 130:
      return 'a';
    case 40:
    case 41:
    case 91:
    case 93:
    case 123:
    case 125:
    case 58:
    case 59:
    case 44:
    case 46:
    case 133:
      return 'p';
    case 150:
    case 152:
    case 126:
    case 33:
    case 61:
    case 148:
    case 158:
    case 146:
    case 136:
    case 140:
    case 139:
    case 151:
    case 153:
    case 149:
    case 131:
    case 154:
    case 156:
    case 63:
    case 147:
    case 145:
    case 124:
    case 94:
    case 38:
    case 137:
    case 162:
    case 157:
    case 43:
    case 45:
    case 42:
    case 47:
    case 155:
    case 37:
    case 135:
    case 144:
    case 134:
    case 143:
    case 60:
    case 62:
    case 129:
    case 138:
    case 142:
    case 141:
      return 'o';
    case 35:
    case 107:
      if (token.get$stringValue() === 'void')
        return 't';
      if (token.get$stringValue() === 'this' || token.get$stringValue() === 'super')
        return 'r';
      return 'k';
    case 0:
      return;
    default:
      return;
  }
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length === 0;
  return receiver.isEmpty$0();
};

$.matchLibrary = function(results, searchText, library) {
  var libraryName = $.index(library, 'name');
  var libraryMatch = $.obtainMatch(searchText, libraryName);
  if (!(libraryMatch == null))
    results.push($.Result$(libraryMatch, 'library', $.S($.prefix) + $.S($.replaceAll($.replaceAll(libraryName, ':', '_'), '/', '_')) + '.html', null, null, null, null));
};

$._IDBTransactionEventsImpl$ = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$._DOMWindowCrossFrameImpl__focus = function(win) {
win.focus()
};

$.dynamicFunction = function(name$) {
  var f = Object.prototype[name$];
  if (!(f == null) && !!f.methods)
    return f.methods;
  var methods = {};
  var dartMethod = Object.getPrototypeOf($.CTC217)[name$];
  if (!(dartMethod == null))
    $.propertySet(methods, 'Object', dartMethod);
  var bind = function() {return $.dynamicBind.call$4(this, name$, methods, Array.prototype.slice.call(arguments));};
  bind.methods = methods;
  $.defineProperty(Object.prototype, name$, bind);
  return methods;
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$.DualPivotQuicksort__dualPivotQuicksort = function(a, left, right, compare) {
  if (typeof a !== 'object' || a === null || (a.constructor !== Array || !!a.immutable$list) && !a.is$JavaScriptIndexingBehavior())
    return $.DualPivotQuicksort__dualPivotQuicksort$bailout(1, a, left, right, compare, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var sixth = $.tdiv($.add($.sub(right, left), 1), 6);
  if (typeof sixth !== 'number')
    throw $.iae(sixth);
  var index1 = left + sixth;
  var index5 = $.sub(right, sixth);
  if (typeof right !== 'number')
    throw $.iae(right);
  var index3 = $.tdiv(left + right, 2);
  var index2 = index3 - sixth;
  var index4 = index3 + sixth;
  if (index1 !== (index1 | 0))
    throw $.iae(index1);
  var t1 = a.length;
  if (index1 < 0 || index1 >= t1)
    throw $.ioore(index1);
  var el1 = a[index1];
  if (index2 !== (index2 | 0))
    throw $.iae(index2);
  if (index2 < 0 || index2 >= t1)
    throw $.ioore(index2);
  var el2 = a[index2];
  if (index3 !== (index3 | 0))
    throw $.iae(index3);
  if (index3 < 0 || index3 >= t1)
    throw $.ioore(index3);
  var el3 = a[index3];
  if (index4 !== (index4 | 0))
    throw $.iae(index4);
  if (index4 < 0 || index4 >= t1)
    throw $.ioore(index4);
  var el4 = a[index4];
  if (index5 !== (index5 | 0))
    throw $.iae(index5);
  if (index5 < 0 || index5 >= t1)
    throw $.ioore(index5);
  var el5 = a[index5];
  if ($.gtB(compare.call$2(el1, el2), 0)) {
    var t0 = el1;
    el1 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.call$2(el4, el5), 0)) {
    t0 = el5;
    el5 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.call$2(el1, el3), 0)) {
    t0 = el3;
    el3 = el1;
    el1 = t0;
  }
  if ($.gtB(compare.call$2(el2, el3), 0)) {
    t0 = el3;
    el3 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.call$2(el1, el4), 0)) {
    t0 = el1;
    el1 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.call$2(el3, el4), 0)) {
    t0 = el3;
    el3 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.call$2(el2, el5), 0)) {
    t0 = el5;
    el5 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.call$2(el2, el3), 0)) {
    t0 = el3;
    el3 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.call$2(el4, el5), 0)) {
    t0 = el5;
    el5 = el4;
    el4 = t0;
  }
  if (index1 < 0 || index1 >= a.length)
    throw $.ioore(index1);
  a[index1] = el1;
  if (index3 < 0 || index3 >= a.length)
    throw $.ioore(index3);
  a[index3] = el3;
  if (index5 < 0 || index5 >= a.length)
    throw $.ioore(index5);
  a[index5] = el5;
  if (left !== (left | 0))
    throw $.iae(left);
  t1 = a.length;
  if (left < 0 || left >= t1)
    throw $.ioore(left);
  var t2 = a[left];
  if (index2 < 0 || index2 >= t1)
    throw $.ioore(index2);
  a[index2] = t2;
  if (right !== (right | 0))
    throw $.iae(right);
  t2 = a.length;
  if (right < 0 || right >= t2)
    throw $.ioore(right);
  var t3 = a[right];
  if (index4 < 0 || index4 >= t2)
    throw $.ioore(index4);
  a[index4] = t3;
  var less = left + 1;
  var great = right - 1;
  var pivots_are_equal = $.eqB(compare.call$2(el2, el4), 0);
  if (pivots_are_equal)
    for (var k = less; k <= great; ++k) {
      if (k !== (k | 0))
        throw $.iae(k);
      if (k < 0 || k >= a.length)
        throw $.ioore(k);
      var ak = a[k];
      var comp = compare.call$2(ak, el2);
      if (typeof comp !== 'number')
        return $.DualPivotQuicksort__dualPivotQuicksort$bailout(2, a, left, compare, less, k, index1, index5, el2, pivots_are_equal, right, ak, comp, el4, great);
      if (comp === 0)
        continue;
      if (comp < 0) {
        if (!(k === less)) {
          if (less !== (less | 0))
            throw $.iae(less);
          t1 = a.length;
          if (less < 0 || less >= t1)
            throw $.ioore(less);
          t2 = a[less];
          if (k < 0 || k >= t1)
            throw $.ioore(k);
          a[k] = t2;
          if (less < 0 || less >= a.length)
            throw $.ioore(less);
          a[less] = ak;
        }
        ++less;
      } else
        for (var less0 = less + 1; true;) {
          if (great !== (great | 0))
            throw $.iae(great);
          if (great < 0 || great >= a.length)
            throw $.ioore(great);
          comp = compare.call$2(a[great], el2);
          if ($.gtB(comp, 0)) {
            --great;
            continue;
          } else {
            t1 = $.ltB(comp, 0);
            var great0 = great - 1;
            t2 = a.length;
            if (t1) {
              if (less !== (less | 0))
                throw $.iae(less);
              if (less < 0 || less >= t2)
                throw $.ioore(less);
              t1 = a[less];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              t1 = a.length;
              if (great < 0 || great >= t1)
                throw $.ioore(great);
              t3 = a[great];
              if (less < 0 || less >= t1)
                throw $.ioore(less);
              a[less] = t3;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
              less = less0;
              break;
            } else {
              if (great < 0 || great >= t2)
                throw $.ioore(great);
              t1 = a[great];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
              break;
            }
          }
        }
    }
  else
    for (k = less; k <= great; ++k) {
      if (k !== (k | 0))
        throw $.iae(k);
      if (k < 0 || k >= a.length)
        throw $.ioore(k);
      ak = a[k];
      if ($.ltB(compare.call$2(ak, el2), 0)) {
        if (!(k === less)) {
          if (less !== (less | 0))
            throw $.iae(less);
          t1 = a.length;
          if (less < 0 || less >= t1)
            throw $.ioore(less);
          t2 = a[less];
          if (k < 0 || k >= t1)
            throw $.ioore(k);
          a[k] = t2;
          if (less < 0 || less >= a.length)
            throw $.ioore(less);
          a[less] = ak;
        }
        ++less;
      } else if ($.gtB(compare.call$2(ak, el4), 0))
        for (less0 = less + 1; true;) {
          if (great !== (great | 0))
            throw $.iae(great);
          if (great < 0 || great >= a.length)
            throw $.ioore(great);
          if ($.gtB(compare.call$2(a[great], el4), 0)) {
            --great;
            if (great < k)
              break;
            continue;
          } else {
            if (great < 0 || great >= a.length)
              throw $.ioore(great);
            t1 = $.ltB(compare.call$2(a[great], el2), 0);
            great0 = great - 1;
            t2 = a.length;
            if (t1) {
              if (less !== (less | 0))
                throw $.iae(less);
              if (less < 0 || less >= t2)
                throw $.ioore(less);
              t1 = a[less];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              t1 = a.length;
              if (great < 0 || great >= t1)
                throw $.ioore(great);
              t3 = a[great];
              if (less < 0 || less >= t1)
                throw $.ioore(less);
              a[less] = t3;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
              less = less0;
            } else {
              if (great < 0 || great >= t2)
                throw $.ioore(great);
              t1 = a[great];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
            }
            break;
          }
        }
    }
  t1 = less - 1;
  if (t1 !== (t1 | 0))
    throw $.iae(t1);
  t2 = a.length;
  if (t1 < 0 || t1 >= t2)
    throw $.ioore(t1);
  t3 = a[t1];
  if (left < 0 || left >= t2)
    throw $.ioore(left);
  a[left] = t3;
  if (t1 < 0 || t1 >= a.length)
    throw $.ioore(t1);
  a[t1] = el2;
  t1 = great + 1;
  if (t1 !== (t1 | 0))
    throw $.iae(t1);
  t3 = a.length;
  if (t1 < 0 || t1 >= t3)
    throw $.ioore(t1);
  var t4 = a[t1];
  if (right < 0 || right >= t3)
    throw $.ioore(right);
  a[right] = t4;
  if (t1 < 0 || t1 >= a.length)
    throw $.ioore(t1);
  a[t1] = el4;
  $.DualPivotQuicksort__doSort(a, left, less - 2, compare);
  $.DualPivotQuicksort__doSort(a, great + 2, right, compare);
  if (pivots_are_equal)
    return;
  if (less < index1 && great > index5) {
    while (true) {
      if (less !== (less | 0))
        throw $.iae(less);
      if (less < 0 || less >= a.length)
        throw $.ioore(less);
      if (!$.eqB(compare.call$2(a[less], el2), 0))
        break;
      ++less;
    }
    while (true) {
      if (great !== (great | 0))
        throw $.iae(great);
      if (great < 0 || great >= a.length)
        throw $.ioore(great);
      if (!$.eqB(compare.call$2(a[great], el4), 0))
        break;
      --great;
    }
    for (k = less; k <= great; ++k) {
      if (k !== (k | 0))
        throw $.iae(k);
      if (k < 0 || k >= a.length)
        throw $.ioore(k);
      ak = a[k];
      if ($.eqB(compare.call$2(ak, el2), 0)) {
        if (!(k === less)) {
          if (less !== (less | 0))
            throw $.iae(less);
          t1 = a.length;
          if (less < 0 || less >= t1)
            throw $.ioore(less);
          t2 = a[less];
          if (k < 0 || k >= t1)
            throw $.ioore(k);
          a[k] = t2;
          if (less < 0 || less >= a.length)
            throw $.ioore(less);
          a[less] = ak;
        }
        ++less;
      } else if ($.eqB(compare.call$2(ak, el4), 0))
        for (less0 = less + 1; true;) {
          if (great !== (great | 0))
            throw $.iae(great);
          if (great < 0 || great >= a.length)
            throw $.ioore(great);
          if ($.eqB(compare.call$2(a[great], el4), 0)) {
            --great;
            if (great < k)
              break;
            continue;
          } else {
            if (great < 0 || great >= a.length)
              throw $.ioore(great);
            t1 = $.ltB(compare.call$2(a[great], el2), 0);
            great0 = great - 1;
            t2 = a.length;
            if (t1) {
              if (less !== (less | 0))
                throw $.iae(less);
              if (less < 0 || less >= t2)
                throw $.ioore(less);
              t1 = a[less];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              t1 = a.length;
              if (great < 0 || great >= t1)
                throw $.ioore(great);
              t3 = a[great];
              if (less < 0 || less >= t1)
                throw $.ioore(less);
              a[less] = t3;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
              less = less0;
            } else {
              if (great < 0 || great >= t2)
                throw $.ioore(great);
              t1 = a[great];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
            }
            break;
          }
        }
    }
    $.DualPivotQuicksort__doSort(a, less, great, compare);
  } else
    $.DualPivotQuicksort__doSort(a, less, great, compare);
};

$.ListImplementation_List$from = function(other, E) {
  var result = $.ListImplementation_List(null);
  for (var t1 = $.iterator(other); t1.hasNext$0() === true;)
    result.push(t1.next$0());
  return result;
};

$.ObjectImplementation_toStringImpl = function(object) {
  return $.Primitives_objectToString(object);
};

$._EventSourceEventsImpl$ = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$._convertNativeToDart_AcceptStructuredClone = function(object) {
  var values = [];
  var copies = [];
  var t1 = new $._convertNativeToDart_AcceptStructuredClone_findSlot(copies, values);
  var t2 = new $._convertNativeToDart_AcceptStructuredClone_readSlot(copies);
  return new $._convertNativeToDart_AcceptStructuredClone_walk(new $._convertNativeToDart_AcceptStructuredClone_writeSlot(copies), t1, t2).call$1(object);
};

$.Result$ = function(match, kind, url, library, type, args, prefix) {
  var t1 = !(args == null) ? '&lt;' + $.S(args) + '&gt;' : '';
  return new $.Result(prefix, match, library, type, t1, kind, url, null);
};

$._FrozenElementList$_wrap = function(_nodeList) {
  return new $._FrozenElementList(_nodeList);
};

$.parseDouble = function(str) {
  $.checkString(str);
  var ret = parseFloat(str);
  if (ret === 0)
    var t1 = $.startsWith(str, '0x') === true || $.startsWith(str, '0X') === true;
  else
    t1 = false;
  if (t1)
    ret = parseInt(str);
  if ($.isNaN(ret) === true && !$.eqB(str, 'NaN') && !$.eqB(str, '-NaN'))
    throw $.captureStackTrace($.FormatException$(str));
  return ret;
};

$._looksLikePublicType = function(name$) {
  if ($.geB($.get$length(name$), 2)) {
    var t1 = $.index(name$, 0);
    if (!$.eqB($.toLowerCase(t1), t1)) {
      t1 = $.index(name$, 1);
      var t2 = !$.eqB($.toUpperCase(t1), t1);
      t1 = t2;
    } else
      t1 = false;
  } else
    t1 = false;
  return t1;
};

$.captureStackTrace = function(ex) {
  if (ex == null)
    ex = $.CTC0;
  var jsError = new Error();
  jsError.name = ex;
  jsError.description = ex;
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.call$0;
  return jsError;
};

$._FrozenCSSClassSet$ = function() {
  return new $._FrozenCSSClassSet(null);
};

$.DualPivotQuicksort_insertionSort_ = function(a, left, right, compare) {
  if (typeof a !== 'object' || a === null || (a.constructor !== Array || !!a.immutable$list) && !a.is$JavaScriptIndexingBehavior())
    return $.DualPivotQuicksort_insertionSort_$bailout(1, a, left, right, compare);
  if (typeof right !== 'number')
    return $.DualPivotQuicksort_insertionSort_$bailout(1, a, left, right, compare);
  for (var i = left + 1; i <= right; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    var el = a[i];
    var j = i;
    while (true) {
      if (j > left) {
        var t1 = j - 1;
        if (t1 !== (t1 | 0))
          throw $.iae(t1);
        if (t1 < 0 || t1 >= a.length)
          throw $.ioore(t1);
        var t2 = $.gtB(compare.call$2(a[t1], el), 0);
        t1 = t2;
      } else
        t1 = false;
      if (!t1)
        break;
      var j0 = j - 1;
      if (j0 !== (j0 | 0))
        throw $.iae(j0);
      t1 = a.length;
      if (j0 < 0 || j0 >= t1)
        throw $.ioore(j0);
      t2 = a[j0];
      if (j !== (j | 0))
        throw $.iae(j);
      if (j < 0 || j >= t1)
        throw $.ioore(j);
      a[j] = t2;
      j = j0;
    }
    if (j !== (j | 0))
      throw $.iae(j);
    if (j < 0 || j >= a.length)
      throw $.ioore(j);
    a[j] = el;
  }
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a >= b;
  return a.operator$ge$1(b);
};

$._convertDartToNative_PrepareForStructuredClone = function(value) {
  var values = [];
  var copies = [];
  var t1 = new $._convertDartToNative_PrepareForStructuredClone_findSlot(copies, values);
  var t2 = new $._convertDartToNative_PrepareForStructuredClone_readSlot(copies);
  var t3 = new $._convertDartToNative_PrepareForStructuredClone_writeSlot(copies);
  var t4 = new $._convertDartToNative_PrepareForStructuredClone_cleanupSlots();
  var copy = new $._convertDartToNative_PrepareForStructuredClone_walk(t3, t1, t2).call$1(value);
  t4.call$0();
  return copy;
};

$.floor = function(receiver) {
  return Math.floor(receiver);
};

$.buildDynamicMetadata = function(inputTable) {
  var result = [];
  for (var i = 0; i < inputTable.length; ++i) {
    var tag = inputTable[i][0];
    var array = inputTable[i];
    var tags = array[1];
    var set = {};
    var tagNames = tags.split('|');
    for (var j = 0, index = 1; j < tagNames.length; ++j) {
      $.propertySet(set, tagNames[j], true);
      index = j;
      array = tagNames;
    }
    result.push($.MetaInfo$(tag, tags, set));
  }
  return result;
};

$.getFunctionForTypeNameOf = function() {
  if (!(typeof(navigator) === 'object'))
    return $.typeNameInChrome;
  var userAgent = navigator.userAgent;
  if ($.contains(userAgent, 'Chrome') || $.contains(userAgent, 'DumpRenderTree'))
    return $.typeNameInChrome;
  else if ($.contains(userAgent, 'Firefox'))
    return $.typeNameInFirefox;
  else if ($.contains(userAgent, 'MSIE'))
    return $.typeNameInIE;
  else if ($.contains(userAgent, 'Opera'))
    return $.typeNameInOpera;
  else if ($.contains(userAgent, 'Safari'))
    return $.typeNameInSafari;
  else
    return $.constructorNameFallback;
};

$._WebSocketEventsImpl$ = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b)) {
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31)
        return 0;
      return a >>> b;
    }
    if (b > 31)
      b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$._convertDartToNative_SerializedScriptValue = function(value) {
  return $._convertDartToNative_PrepareForStructuredClone(value);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$._MediaStreamEventsImpl$ = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target == null))
    target.builtin$typeInfo = typeInfo;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number')
    return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string'))
    return receiver.hashCode$0();
  var length$ = receiver.length;
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + receiver.charCodeAt(i);
    var hash1 = 536870911 & hash0 + 524287 & hash0 << 10;
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + 67108863 & hash << 3;
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + 16383 & hash0 << 15;
};

$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a * b;
  return a.operator$mul$1(b);
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number'))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  } else
    return receiver.charCodeAt$1(index);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null)
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.call$1(obj);
};

$.StringImplementation__fromCharCodes = function(charCodes) {
  $.checkNull(charCodes);
  if (!$.isJsArray(charCodes))
    charCodes = $.ListImplementation_List$from(charCodes);
  return $.Primitives_stringFromCharCodes(charCodes);
};

$.ListImplementation_List = function(length$, E) {
  return $.Primitives_newList(length$);
};

$.document = function() {
return document;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a * b : $.mul$slow(a, b);
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix == null)
    if ($._Device_isFirefox() === true)
      $._cachedBrowserPrefix = '-moz-';
    else
      $._cachedBrowserPrefix = '-webkit-';
  return $._cachedBrowserPrefix;
};

$._EventsImpl$ = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.setupSearch = function(libraries) {
  $.libraryList = libraries;
  $.searchInput = $.query('#q');
  $.dropdown = $.query('#drop-down');
  $.add$1($.searchInput.get$on().get$keyDown(), $.handleUpDown);
  $.add$1($.searchInput.get$on().get$keyUp(), $.updateDropDown);
  $.add$1($.searchInput.get$on().get$change(), $.updateDropDown);
  $.add$1($.searchInput.get$on().get$reset(), $.updateDropDown);
  $.add$1($.searchInput.get$on().get$focus(), new $.setupSearch_anon());
  $.add$1($.searchInput.get$on().get$blur(), new $.setupSearch_anon0());
  $.add$1($.window().get$on().get$keyDown(), $.shortcutHandler);
};

$.toUpperCase = function(receiver) {
  if (!(typeof receiver === 'string'))
    return receiver.toUpperCase$0();
  return receiver.toUpperCase();
};

$._BodyElementEventsImpl$ = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$.parseInt = function(str) {
  $.checkString(str);
  if (!/^\s*[+-]?(?:0[xX][abcdefABCDEF0-9]+|\d+)\s*$/.test(str))
    throw $.captureStackTrace($.FormatException$(str));
  var trimmed = $.trim(str);
  if ($.gtB($.get$length(trimmed), 2))
    var t1 = $.eqB($.index(trimmed, 1), 'x') || $.eqB($.index(trimmed, 1), 'X');
  else
    t1 = false;
  if (!t1)
    if ($.gtB($.get$length(trimmed), 3))
      t1 = $.eqB($.index(trimmed, 2), 'x') || $.eqB($.index(trimmed, 2), 'X');
    else
      t1 = false;
  else
    t1 = true;
  var base = t1 ? 16 : 10;
  var ret = parseInt(trimmed, base);
  if ($.isNaN(ret) === true)
    throw $.captureStackTrace($.FormatException$(str));
  return ret;
};

$.Strings_join = function(strings, separator) {
  return $.StringImplementation_join(strings, separator);
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.StringImplementation_join = function(strings, separator) {
  $.checkNull(strings);
  $.checkNull(separator);
  return $.stringJoinUnchecked($.StringImplementation__toJsStringArray(strings), separator);
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length;
  else
    return receiver.get$length();
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = methods[tag];
  if (method == null && !($._dynamicMetadata0() == null))
    for (var i = 0; i < $._dynamicMetadata0().length; ++i) {
      var entry = $._dynamicMetadata0()[i];
      if (entry.get$_set()[tag]) {
        method = methods[entry.get$_tag()];
        if (!(method == null))
          break;
      }
    }
  if (method == null)
    method = methods['Object'];
  var proto = Object.getPrototypeOf(obj);
  if (method == null)
    method = function () {if (Object.getPrototypeOf(this) === proto) {throw new TypeError(name$ + " is not a function");} else {return Object.prototype[name$].apply(this, arguments);}};
  if (!proto.hasOwnProperty(name$))
    $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$.buildLibraryNavigation = function(html, libraryInfo) {
  var types = [];
  var exceptions = [];
  for (var t1 = $.iterator($.index(libraryInfo, 'types')); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if ($.endsWith($.index(t2, 'name'), 'Exception') === true)
      exceptions.push(t2);
    else
      types.push(t2);
  }
  if (types.length === 0 && exceptions.length === 0)
    return;
  t1 = new $.buildLibraryNavigation_writeType(html);
  html.add$1('<ul class="icon">');
  $.forEach(types, new $.buildLibraryNavigation_anon(t1));
  $.forEach(exceptions, new $.buildLibraryNavigation_anon0(t1));
  html.add$1('</ul>');
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number')
    return isNaN(receiver);
  else
    return receiver.isNaN$0();
};

$.JSON_parse = function(json) {
  return $._JsonParser$_internal(json)._parseToplevel$0();
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  if (multiLine === true)
    $.add$1(sb, 'm');
  if (ignoreCase === true)
    $.add$1(sb, 'i');
  if (global)
    $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, String(e)));
  }

};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver))
    return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.main = function() {
  $.setupLocation();
  $.enableCodeBlocks();
  $._HttpRequestFactoryProvider_HttpRequest$get($.S($.prefix) + 'nav.json', new $.main_anon());
};

$.ceil = function(receiver) {
  return Math.ceil(receiver);
};

$.matchAllMembersInType = function(results, typeText, memberText) {
  var searchText = $.SearchText$(typeText);
  var emptyText = $.SearchText$(memberText);
  for (var t1 = $.iterator($.libraryList); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    var libraryName = $.index(t2, 'name');
    if (t2.containsKey$1('types') === true)
      for (var t3 = $.iterator($.index(t2, 'types')); t3.hasNext$0() === true;) {
        t2 = t3.next$0();
        var typeName = $.index(t2, 'name');
        var typeMatch = $.obtainMatch(searchText, typeName);
        if (!(typeMatch == null))
          if (t2.containsKey$1('members') === true)
            for (var t4 = $.iterator($.index(t2, 'members')); t4.hasNext$0() === true;) {
              t2 = t4.next$0();
              results.push($.Result$($.obtainMatch(emptyText, $.index(t2, 'name')), $.index(t2, 'kind'), $.getTypeMemberUrl(libraryName, typeName, t2), libraryName, null, null, typeMatch));
            }
      }
  }
};

$.LeafKeywordState$ = function(syntax) {
  return new $.LeafKeywordState($.index($.Keyword_keywords(), syntax));
};

$._FrozenElementListIterator$ = function(_list) {
  return new $._FrozenElementListIterator(_list, 0);
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListImplementation_List(null));
  return result.toString$0();
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.resultComparator = function(a, b) {
  var result = $.compareBools(a.get$isTopLevel(), b.get$isTopLevel());
  if (!(result === 0))
    return result;
  if (!(a.get$prefix() == null) && !(b.get$prefix() == null)) {
    result = $.compareBools(a.get$prefix().get$isFullMatch(), b.get$prefix().get$isFullMatch());
    if (!(result === 0))
      return result;
  }
  result = $.compareBools($.eq(a.get$match().get$matchOffset(), 0), $.eq(b.get$match().get$matchOffset(), 0));
  if (!(result === 0))
    return result;
  result = $.compareBools($.eq(a.get$match().get$matchEnd(), $.get$length(a.get$match().get$text())), $.eq(b.get$match().get$matchEnd(), $.get$length(b.get$match().get$text())));
  if (!(result === 0))
    return result;
  result = $.compareBools(a.get$match().get$isExactMatch(), b.get$match().get$isExactMatch());
  if (!(result === 0))
    return result;
  result = $.compareBools(a.get$match().get$isCamelCaseMatch(), b.get$match().get$isCamelCaseMatch());
  if (!(result === 0))
    return result;
  result = $.compareTo(a.get$match().get$matchOffset(), b.get$match().get$matchOffset());
  if (!$.eqB(result, 0))
    return result;
  if (!(a.get$type() == null) && !(b.get$type() == null)) {
    result = $.compareTo($.get$length(a.get$type()), $.get$length(b.get$type()));
    if (!$.eqB(result, 0))
      return result;
    result = $.compareTo($.toLowerCase(a.get$type()), $.toLowerCase(b.get$type()));
    if (!$.eqB(result, 0))
      return result;
  }
  return $.compareTo($.toLowerCase(a.get$match().get$text()), $.toLowerCase(b.get$match().get$text()));
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0))
    return new $.invokeClosure_anon(closure).call$0();
  else if ($.eqB(numberOfArguments, 1))
    return new $.invokeClosure_anon0(closure, arg1).call$0();
  else if ($.eqB(numberOfArguments, 2))
    return new $.invokeClosure_anon1(closure, arg1, arg2).call$0();
  else
    throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$._looksLikeType = function(name$) {
  return $._looksLikePublicType(name$) || $._looksLikePrivateType(name$);
};

$.StringWrapper$ = function(stringValue) {
  return new $.StringWrapper(stringValue);
};

$._HttpRequestEventsImpl$ = function(_ptr) {
  return new $._HttpRequestEventsImpl(_ptr);
};

$.addLast = function(receiver, value) {
  if (!$.isJsArray(receiver))
    return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$.matchTypes = function(results, searchText, library) {
  if (library.containsKey$1('types') === true) {
    var libraryName = $.index(library, 'name');
    for (var t1 = $.iterator($.index(library, 'types')); t1.hasNext$0() === true;) {
      var t2 = t1.next$0();
      $.index(t2, 'name');
      $.matchType(results, searchText, libraryName, t2);
      $.matchTypeMembers(results, searchText, libraryName, t2);
    }
  }
};

$._DOMWindowCrossFrameImpl__blur = function(win) {
win.blur()
};

$._HttpRequestUtils_get = function(url, onSuccess, withCredentials) {
  var request = $._HttpRequestFactoryProvider_HttpRequest();
  request.open$3('GET', url, true);
  request.set$withCredentials(withCredentials);
  $.add$1(request.get$on().get$readyStateChange(), new $._HttpRequestUtils_get_anon(request, onSuccess));
  request.send$0();
  return request;
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a >= b : $.ge$slow(a, b) === true;
};

$._isJavaScriptSimpleObject = function(value) {
  return Object.getPrototypeOf(value) === Object.prototype;
};

$.StringMatch$ = function(searchText, text, matchOffset, matchEnd) {
  return new $.StringMatch(searchText, text, matchOffset, matchEnd);
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$._ChildNodeListLazy$ = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a + b : $.add$slow(a, b);
};

$._convertNativeToDart_IDBKey = function(nativeKey) {
  if (new $._convertNativeToDart_IDBKey_containsDate().call$1(nativeKey) === true)
    throw $.captureStackTrace($.CTC15);
  return nativeKey;
};

$.compareTo = function(a, b) {
  if ($.checkNumbers(a, b))
    if ($.ltB(a, b))
      return -1;
    else if ($.gtB(a, b))
      return 1;
    else if ($.eqB(a, b)) {
      if ($.eqB(a, 0)) {
        var aIsNegative = $.isNegative(a);
        if ($.eqB(aIsNegative, $.isNegative(b)))
          return 0;
        if (aIsNegative === true)
          return -1;
        return 1;
      }
      return 0;
    } else if ($.isNaN(a) === true) {
      if ($.isNaN(b) === true)
        return 0;
      return 1;
    } else
      return -1;
  else if (typeof a === 'string') {
    if (!(typeof b === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a == b)
      var t1 = 0;
    else
      t1 = a < b ? -1 : 1;
    return t1;
  } else
    return a.compareTo$1(b);
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a <= b : $.le$slow(a, b) === true;
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$._IDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$._WorkerEventsImpl$ = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'Document')
    return 'HTMLDocument';
  if (name$ === 'XMLDocument')
    return 'Document';
  if (name$ === 'WorkerMessageEvent')
    return 'MessageEvent';
  if (name$ === 'DragEvent')
    return 'MouseEvent';
  if (name$ === 'DataTransfer')
    return 'Clipboard';
  if (name$ === 'FormData')
    return 'DOMFormData';
  return name$;
};

$._DOMWindowCrossFrameImpl$ = function(_window) {
  return new $._DOMWindowCrossFrameImpl(_window);
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a - b;
  return a.operator$sub$1(b);
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListImplementation_List(null));
  return result.toString$0();
};

$._SharedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver)) {
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, receiver.length);
  } else if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0)
      return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$.kindToString = function(kind) {
  if ($.eqB(kind, 'library'))
    return 'library';
  else if ($.eqB(kind, 'class'))
    return 'class';
  else if ($.eqB(kind, 'interface'))
    return 'interface';
  else if ($.eqB(kind, 'typedef'))
    return 'typedef';
  else if ($.eqB(kind, 'field'))
    return 'field';
  else if ($.eqB(kind, 'constructor'))
    return 'constructor';
  else if ($.eqB(kind, 'method'))
    return 'method';
  else if ($.eqB(kind, 'getter'))
    return 'getter';
  else if ($.eqB(kind, 'setter'))
    return 'setter';
  return '';
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'Document') {
    if (!!obj.xmlVersion)
      return 'Document';
    return 'HTMLDocument';
  }
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'DataTransfer')
    return 'Clipboard';
  if (name$ === 'DragEvent')
    return 'MouseEvent';
  if (name$ === 'HTMLDDElement')
    return 'HTMLElement';
  if (name$ === 'HTMLDTElement')
    return 'HTMLElement';
  if (name$ === 'HTMLTableDataCellElement')
    return 'HTMLTableCellElement';
  if (name$ === 'HTMLTableHeaderCellElement')
    return 'HTMLTableCellElement';
  if (name$ === 'HTMLPhraseElement')
    return 'HTMLElement';
  if (name$ === 'MSStyleCSSProperties')
    return 'CSSStyleDeclaration';
  if (name$ === 'MouseWheelEvent')
    return 'WheelEvent';
  if (name$ === 'FormData')
    return 'DOMFormData';
  return name$;
};

$.MetaInfo$ = function(_tag, _tags, _set) {
  return new $.MetaInfo(_tag, _tags, _set);
};

$.trim = function(receiver) {
  if (!(typeof receiver === 'string'))
    return receiver.trim$0();
  return receiver.trim();
};

$._TextTrackEventsImpl$ = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.StringScanner$ = function(string, includeComments) {
  var t1 = new $.StringScanner(string, $.Token$($.CTC28, -1), null, -1, -1, includeComments, 0, $.CTC216);
  t1.ArrayBasedScanner$1(includeComments);
  return t1;
};

$.DoubleLinkedQueue$ = function(E) {
  var t1 = new $.DoubleLinkedQueue(null);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.Primitives_newList = function(length$) {
  if (length$ == null)
    return new Array();
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)) || length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = new Array(length$);
  result.fixed$length = true;
  return result;
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$2(startIndex, endIndex);
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null)
    endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$))
    throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.getRuntimeTypeInfo = function(target) {
  if (target == null)
    return;
  var res = target.builtin$typeInfo;
  return res == null ? {} : res;
};

$.window = function() {
return window;
};

$.Token$ = function(info, charOffset) {
  return new $.Token(info, charOffset, null);
};

$.shortcutHandler = function(event$) {
  if ($.eqB(event$.get$keyCode(), 70) && event$.get$ctrlKey() === true || $.eqB(event$.get$keyIdentifier(), 'F3')) {
    $.searchInput.focus$0();
    event$.preventDefault$0();
  }
};

$.HashMapImplementation$ = function(K, V) {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  $.setRuntimeTypeInfo(t1, { 'K': K, 'V': V });
  t1.HashMapImplementation$0();
  return t1;
};

$._SVGElementInstanceEventsImpl$ = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$._JsonParser$_internal = function(json) {
  var t1 = new $._JsonParser(json, $.get$length(json), 0);
  t1._JsonParser$_internal$1(json);
  return t1;
};

$._FixedSizeListIterator$ = function(array, T) {
  var t1 = new $._FixedSizeListIterator($.get$length(array), array, 0);
  $.setRuntimeTypeInfo(t1, { 'T': T });
  return t1;
};

$._FileReaderEventsImpl$ = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.HashSetImplementation$ = function(E) {
  var t1 = new $.HashSetImplementation(null);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1.HashSetImplementation$0();
  return t1;
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.matchTypeMembers = function(results, searchText, libraryName, type) {
  if (type.containsKey$1('members') === true) {
    var typeName = $.index(type, 'name');
    for (var t1 = $.iterator($.index(type, 'members')); t1.hasNext$0() === true;) {
      var t2 = t1.next$0();
      var memberMatch = $.obtainMatch(searchText, $.index(t2, 'name'));
      if (!(memberMatch == null))
        results.push($.Result$(memberMatch, $.index(t2, 'kind'), $.getTypeMemberUrl(libraryName, typeName, t2), libraryName, typeName, $.index(type, 'args'), null));
    }
  }
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true;)
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  return result;
};

$.MalformedInputException$ = function(message, position) {
  return new $.MalformedInputException(message, position);
};

$.currentResult = function(result) {
  if (!$.eqB($._currentResult, result)) {
    if (!($._currentResult == null))
      $._currentResult.get$row().get$classes().remove$1('drop-down-link-select');
    $._currentResult = result;
    if (!($._currentResult == null))
      $.add$1($._currentResult.get$row().get$classes(), 'drop-down-link-select');
  }
};

$.currentResult0 = function() {
  return $._currentResult;
};

$.ArrayKeywordState$ = function(table, syntax) {
  var t1 = syntax == null ? null : $.index($.Keyword_keywords(), syntax);
  return new $.ArrayKeywordState(table, t1);
};

$.BeginGroupToken$ = function(info, value, charOffset) {
  return new $.BeginGroupToken(null, $.StringWrapper$(value), info, charOffset, null);
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$._WindowEventsImpl$ = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$._EventListenerListImpl$ = function(_ptr, _type) {
  return new $._EventListenerListImpl(_ptr, _type);
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a > b;
  return a.operator$gt$1(b);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$._DOMApplicationCacheEventsImpl$ = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.matchType = function(results, searchText, libraryName, type) {
  var typeMatch = $.obtainMatch(searchText, $.index(type, 'name'));
  if (!(typeMatch == null))
    results.push($.Result$(typeMatch, $.index(type, 'kind'), $.getTypeUrl(libraryName, type), libraryName, null, $.index(type, 'args'), null));
};

$.handleUpDown = function(event$) {
  if ($.eqB(event$.get$keyIdentifier(), 'Up')) {
    var t1 = $.sub($.currentResultIndex(), 1);
    $.currentResultIndex0(t1);
    event$.preventDefault$0();
  } else if ($.eqB(event$.get$keyIdentifier(), 'Down')) {
    t1 = $.add($.currentResultIndex(), 1);
    $.currentResultIndex0(t1);
    event$.preventDefault$0();
  } else if ($.eqB(event$.get$keyIdentifier(), 'Enter'))
    if (!($.currentResult0() == null)) {
      t1 = $.currentResult0().get$url();
      $.window().get$location().set$href(t1);
      event$.preventDefault$0();
      $.hideDropDown();
    }
};

$._LocationWrapper__set = function(p, m, v) {
p[m] = v;
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (!first)
      $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.FilteredElementList$ = function(node) {
  return new $.FilteredElementList(node, node.get$nodes());
};

$._document = function() {
return document;
};

$.hideDropDown = function() {
  if ($.hideDropDownSuspend === true)
    return;
  $.dropdown.get$style().set$visibility('hidden');
};

$.typeNameInChrome = function(obj) {
  var name$ = obj.constructor.name;
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver')
    return 'MutationObserver';
  if (name$ === 'FormData')
    return 'DOMFormData';
  return name$;
};

$.matchAllMembers = function(results, memberText) {
  var searchText = $.SearchText$(memberText);
  for (var t1 = $.iterator($.libraryList); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    var libraryName = $.index(t2, 'name');
    if (t2.containsKey$1('types') === true)
      for (var t3 = $.iterator($.index(t2, 'types')); t3.hasNext$0() === true;) {
        t2 = t3.next$0();
        var typeName = $.index(t2, 'name');
        if (t2.containsKey$1('members') === true)
          for (var t4 = $.iterator($.index(t2, 'members')); t4.hasNext$0() === true;) {
            var t5 = t4.next$0();
            var memberMatch = $.obtainMatch(searchText, $.index(t5, 'name'));
            if (!(memberMatch == null))
              results.push($.Result$(memberMatch, $.index(t5, 'kind'), $.getTypeMemberUrl(libraryName, typeName, t5), libraryName, typeName, $.index(t2, 'args'), null));
          }
      }
  }
};

$._FrameSetElementEventsImpl$ = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.StringImplementation__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || (strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())
    return $.StringImplementation__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings)) {
    for (var i = 0; i < length$; ++i) {
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      var string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListImplementation_List(length$);
    for (i = 0; i < length$; ++i) {
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      if (i < 0 || i >= array.length)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$._Elements_TableElement = function() {
  return $._document().$dom_createElement$1('table');
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_pattern, _errmsg);
};

$._IDBDatabaseEventsImpl$ = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.getTypeNameOf(obj);
};

$.query = function(selector) {
  return $._document().query$1(selector);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string'))
    return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.constructorNameFallback = function(obj) {
  var constructor$ = obj.constructor;
  if (typeof(constructor$) === 'function') {
    var name$ = constructor$.name;
    if (typeof name$ === 'string')
      var t1 = !(name$ === '') && !(name$ === 'Object') && !(name$ === 'Function.prototype');
    else
      t1 = false;
    if (t1)
      return name$;
  }
  var string = Object.prototype.toString.call(obj);
  return string.substring(8, string.length - 1);
};

$.FormatException$ = function(message) {
  return new $.FormatException(message);
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b) === true;
};

$.indexOf$1 = function(receiver, element) {
  if ($.isJsArray(receiver))
    return $.Arrays_indexOf(receiver, element, 0, receiver.length);
  else if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof element === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(element));
    return receiver.indexOf(element);
  }
  return receiver.indexOf$1(element);
};

$.filter = function(receiver, predicate) {
  if (!$.isJsArray(receiver))
    return receiver.filter$1(predicate);
  else
    return $.Collections_filter(receiver, [], predicate);
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b))
    return $.truncate(a / b);
  return a.operator$tdiv$1(b);
};

$._ChildrenElementList$_wrap = function(element) {
  return new $._ChildrenElementList(element, element.get$$$dom_children());
};

$.Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      destination.push(t2);
  }
  return destination;
};

$.unwrapException = function(ex) {
  if ("dartException" in ex)
    return ex.dartException;
  var message = ex.message;
  if (ex instanceof TypeError) {
    var type = ex.type;
    var name$ = ex.arguments ? ex.arguments[0] : "";
    if ($.eqB(type, 'property_not_function') || $.eqB(type, 'called_non_callable') || $.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NullPointerException$(null, $.CTC);
    else if ($.eqB(type, 'undefined_method'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NoSuchMethodException$('', name$, [], null);
    var ieErrorCode = ex.number & 0xffff;
    var ieFacilityNumber = ex.number>>16 & 0x1FFF;
    if (typeof message === 'string')
      if ($.endsWith(message, 'is null') === true || $.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true)
        return $.NullPointerException$(null, $.CTC);
      else {
        if ($.contains$1(message, ' is not a function') !== true)
          var t1 = ieErrorCode === 438 && ieFacilityNumber === 10;
        else
          t1 = true;
        if (t1)
          return $.NoSuchMethodException$('', '<unknown>', [], null);
      }
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true)
      return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError)
    if (typeof message === 'string' && message === 'too much recursion')
      return $.StackOverflowException$();
  return ex;
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number')
    if (typeof b === 'number')
      return true;
    else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    }
  return false;
};

$.KeywordToken$ = function(value, charOffset) {
  return new $.KeywordToken(value, value.get$info(), charOffset, null);
};

$._Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      destination.push(t2);
  }
  return destination;
};

$._MediaStreamTrackListEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackListEventsImpl(_ptr);
};

$._NodeListWrapper$ = function(list) {
  return new $._NodeListWrapper(list);
};

$.Keyword_keywords = function() {
  if ($.Keyword__keywords == null)
    $.Keyword__keywords = $.Keyword_computeKeywordMap();
  return $.Keyword__keywords;
};

$._HttpRequestFactoryProvider_HttpRequest$get = function(url, onSuccess) {
  return $._HttpRequestUtils_get(url, onSuccess, false);
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(_receiver, _functionName, _arguments, existingArgumentNames);
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string'))
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$.replaceAll = function(receiver, from, to) {
  if (!(typeof receiver === 'string'))
    return receiver.replaceAll$2(from, to);
  $.checkString(to);
  return $.stringReplaceAllUnchecked(receiver, from, to);
};

$._DoubleLinkedQueueIterator$ = function(_sentinel, E) {
  var t1 = new $._DoubleLinkedQueueIterator(_sentinel, null);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$._DataAttributeMap$ = function($$dom_attributes) {
  return new $._DataAttributeMap($$dom_attributes);
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.updateResults = function(searchText, results) {
  $.currentSearchText = searchText;
  $.currentResults = results;
  if ($.isEmpty($.currentResults) === true) {
    $._currentResultIndex = -1;
    $.currentResult(null);
  } else {
    $._currentResultIndex = 0;
    var t1 = $.index($.currentResults, 0);
    $.currentResult(t1);
  }
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof startIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.buildNavigation = function(libraries) {
  var html = $.StringBufferImpl$('');
  for (var t1 = $.iterator(libraries); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    var libraryName = $.index(t2, 'name');
    html.add$1('<h2><div class="icon-library"></div>');
    if ($.eqB($.currentLibrary, libraryName) && $.currentType == null)
      html.add$1('<strong>' + $.S($.escapeHtml(libraryName)) + '</strong>');
    else
      html.add$1('<a href="' + ($.S($.prefix) + $.S($.replaceAll($.replaceAll(libraryName, ':', '_'), '/', '_')) + '.html') + '">' + $.S($.escapeHtml(libraryName)) + '</a>');
    html.add$1('</h2>');
    if ($.eqB($.currentLibrary, libraryName) && t2.containsKey$1('types') === true)
      $.buildLibraryNavigation(html, t2);
  }
  $.document().query$1('.nav').set$innerHTML(html.toString$0());
};

$.escapeHtml = function(html) {
  return $.replaceAll($.replaceAll($.replaceAll(html, '&', '&amp;'), '<', '&lt;'), '>', '&gt;');
};

$._HttpRequestFactoryProvider_HttpRequest = function() {
return new XMLHttpRequest();
};

$.sort = function(receiver, compare) {
  if (!$.isJsArray(receiver))
    return receiver.sort$1(compare);
  $.checkMutable(receiver, 'sort');
  $.DualPivotQuicksort_sort(receiver, compare);
};

$.DualPivotQuicksort_sort = function(a, compare) {
  $.DualPivotQuicksort__doSort(a, 0, $.sub($.get$length(a), 1), compare);
};

$._ElementFactoryProvider_Element$tag = function(tag) {
return document.createElement(tag)
};

$.stringSplitUnchecked = function(receiver, pattern) {
  return receiver.split(pattern);
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a < b;
  return a.operator$lt$1(b);
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection()))
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    else
      $.Collections__emitCollection(o, result, visiting);
  else if (typeof o === 'object' && o !== null && o.is$Map())
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, '{...}');
    else
      $.Maps__emitMap(o, result, visiting);
  else
    $.add$1(result, o == null ? 'null' : o);
};

$._DedicatedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$.getTypeMemberUrl = function(libraryName, typeName, memberInfo) {
  return $.S($.prefix) + $.S($.replaceAll($.replaceAll(libraryName, ':', '_'), '/', '_')) + '/' + $.S($.replaceAll($.replaceAll(typeName, ':', '_'), '/', '_')) + '.html#' + $.S($.getMemberAnchor(memberInfo));
};

$._AttributeClassSet$ = function(element) {
  return new $._AttributeClassSet(element);
};

$.truncate = function(receiver) {
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.getMemberAnchor = function(memberInfo) {
  return memberInfo.containsKey$1('link_name') === true ? $.index(memberInfo, 'link_name') : $.index(memberInfo, 'name');
};

$._LocationWrapper$ = function(_ptr) {
  return new $._LocationWrapper(_ptr);
};

$.StringImplementation_String$fromCharCodes = function(charCodes) {
  return $.StringImplementation__fromCharCodes(charCodes);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.compareBools = function(a, b) {
  if ($.eqB(a, b))
    return 0;
  return a === true ? -1 : 1;
};

$.Primitives_stringFromCharCodes = function(charCodes) {
  for (var t1 = $.iterator(charCodes); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (!(typeof t2 === 'number' && t2 === (t2 | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(t2));
  }
  return String.fromCharCode.apply(null, charCodes);
};

$.Keyword_computeKeywordMap = function() {
  var result = $.LinkedHashMapImplementation$('String', 'Keyword');
  for (var t1 = $.iterator($.CTC215); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    result.operator$indexSet$2(t2.get$syntax(), t2);
  }
  return result;
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null)
    if ($.isJsArray(value))
      return $.Collections_collectionToString(value);
    else
      return value.toString$0();
  if (value === 0 && (1 / value) < 0)
    return '-0.0';
  if (value == null)
    return 'null';
  if (typeof value == "function")
    return 'Closure';
  return String(value);
};

$.currentResultIndex0 = function(index) {
  if ($.ltB(index, -1))
    return;
  if ($.geB(index, $.get$length($.currentResults)))
    return;
  if (!$.eqB(index, $._currentResultIndex)) {
    $._currentResultIndex = index;
    if ($.geB(index, 0)) {
      var t1 = $.index($.currentResults, $._currentResultIndex);
      $.currentResult(t1);
    } else
      $.currentResult(null);
  }
};

$.currentResultIndex = function() {
  return $._currentResultIndex;
};

$.obtainMatch = function(searchText, text) {
  if (searchText.isEmpty$0() === true)
    return $.StringMatch$(searchText, text, 0, 0);
  var offset = $.indexOf$1($.toLowerCase(text), searchText.lowerCase);
  if (!$.eqB(offset, -1))
    return $.StringMatch$(searchText, text, offset, $.add(offset, $.get$length(searchText)));
  return;
};

$.toLowerCase = function(receiver) {
  if (!(typeof receiver === 'string'))
    return receiver.toLowerCase$0();
  return receiver.toLowerCase();
};

$.addAll = function(receiver, collection) {
  if (!$.isJsArray(receiver))
    return receiver.addAll$1(collection);
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true;)
    $.add$1(receiver, iterator.next$0());
};

$._AudioContextEventsImpl$ = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$._TextTrackCueEventsImpl$ = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.KeywordState_computeKeywordStateTable = function(start, strings, offset, length$) {
  var result = $.ListImplementation_List(26, 'KeywordState');
  for (var t1 = offset + length$, t2 = start + 1, i = offset, isLeaf = false, chunk = 0, chunkStart = -1; i < t1; ++i) {
    if (i < 0 || i >= strings.length)
      throw $.ioore(i);
    var t3 = $.get$length(strings[i]);
    if (typeof t3 !== 'number')
      return $.KeywordState_computeKeywordStateTable$bailout(1, start, strings, offset, i, t2, result, chunk, chunkStart, isLeaf, t3, t1);
    if (t3 === start)
      isLeaf = true;
    if (i < 0 || i >= strings.length)
      throw $.ioore(i);
    t3 = $.get$length(strings[i]);
    if (typeof t3 !== 'number')
      return $.KeywordState_computeKeywordStateTable$bailout(2, isLeaf, strings, offset, i, t2, t3, start, result, chunk, chunkStart, t1);
    if (t3 > start) {
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      var c = $.charCodeAt(strings[i], start);
      if (c !== (c | 0))
        return $.KeywordState_computeKeywordStateTable$bailout(3, isLeaf, strings, offset, i, t2, start, result, chunk, chunkStart, t1, c);
      if (!(chunk === c)) {
        if (!(chunkStart === -1)) {
          t3 = chunk - 97;
          var t4 = $.KeywordState_computeKeywordStateTable(t2, strings, chunkStart, i - chunkStart);
          if (t3 < 0 || t3 >= result.length)
            throw $.ioore(t3);
          result[t3] = t4;
        }
        chunk = c;
        chunkStart = i;
      }
    }
  }
  if (!(chunkStart === -1)) {
    t3 = chunk - 97;
    t2 = $.KeywordState_computeKeywordStateTable(t2, strings, chunkStart, t1 - chunkStart);
    if (t3 < 0 || t3 >= result.length)
      throw $.ioore(t3);
    result[t3] = t2;
  } else {
    if (offset < 0 || offset >= strings.length)
      throw $.ioore(offset);
    return $.LeafKeywordState$(strings[offset]);
  }
  if (isLeaf) {
    if (offset < 0 || offset >= strings.length)
      throw $.ioore(offset);
    return $.ArrayKeywordState$(result, strings[offset]);
  } else
    return $.ArrayKeywordState$(result, null);
};

$.typeNameInSafari = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver')
    return 'MutationObserver';
  if (name$ === 'FormData')
    return 'DOMFormData';
  return name$;
};

$._ElementAttributeMap$ = function(_element) {
  return new $._ElementAttributeMap(_element);
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = other.length;
  if (otherLength > receiverLength)
    return false;
  return other === $.substring$1(receiver, receiverLength - otherLength);
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.StringCodeIterator$substring = function(string, index, end) {
  var t1 = new $.StringCodeIterator(string, index, end);
  t1.StringCodeIterator$substring$3(string, index, end);
  return t1;
};

$._WorkerContextEventsImpl$ = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$._ElementEventsImpl$ = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.contains = function(userAgent, name$) {
  return !(userAgent.indexOf(name$) === -1);
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata0 = function() {
  if (typeof($dynamicMetadata) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$._SpeechRecognitionEventsImpl$ = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$.StringToken$fromSource = function(info, value, charOffset) {
  return new $.StringToken(value, info, charOffset, null);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a + b;
  return a.operator$add$1(b);
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number')
    return receiver === 0 ? 1 / receiver < 0 : receiver < 0;
  else
    return receiver.isNegative$0();
};

$.updateDropDown = function(event$) {
  if ($.libraryList == null)
    return;
  if ($.searchInput == null)
    return;
  if ($.dropdown == null)
    return;
  var results = [];
  var text = $.searchInput.get$value();
  if ($.eqB(text, $.currentSearchText))
    return;
  if ($.isEmpty(text) === true) {
    $.updateResults(text, results);
    $.hideDropDown();
    return;
  }
  if ($.contains$1(text, '.') === true) {
    var typeText = $.substring$2(text, 0, $.indexOf$1(text, '.'));
    var memberText = $.substring$1(text, $.add($.indexOf$1(text, '.'), 1));
    if ($.isEmpty(typeText) === true && $.isEmpty(memberText) === true)
      ;
    else if ($.isEmpty(typeText) === true)
      $.matchAllMembers(results, memberText);
    else if ($.isEmpty(memberText) === true)
      $.matchAllMembersInType(results, typeText, memberText);
    else
      $.matchMembersInType(results, text, typeText, memberText);
  } else {
    var searchText = $.SearchText$(text);
    for (var t1 = $.iterator($.libraryList); t1.hasNext$0() === true;) {
      var t2 = t1.next$0();
      $.matchLibrary(results, searchText, t2);
      $.matchLibraryMembers(results, searchText, t2);
      $.matchTypes(results, searchText, t2);
    }
  }
  var elements = [];
  var table = $._Elements_TableElement();
  $.add$1(table.get$classes(), 'drop-down-table');
  elements.push(table);
  if ($.isEmpty(results) === true)
    table.insertRow$1(0).set$innerHTML('<tr><td>No matches found for \'' + $.S(text) + '\'.</td></tr>');
  else {
    $.sort(results, $.resultComparator);
    for (var t1 = $.iterator(results), count = 0; t1.hasNext$0() === true;) {
      t1.next$0().addRow$1(table);
      ++count;
      if (count >= 10)
        break;
    }
    if (results.length >= 10) {
      table.insertRow$1($.get$length(table.get$rows())).set$innerHTML('<tr><td>+ ' + $.S(results.length - 10) + ' more.</td></tr>');
      results = $.getRange(results, 0, 10);
    }
  }
  $.dropdown.set$elements(elements);
  $.updateResults(text, results);
  $.showDropDown();
};

$.SearchText$ = function(searchText) {
  var t1 = $.toLowerCase(searchText);
  var t2 = $.isEmpty(searchText) === true ? '' : $.S($.toUpperCase($.substring$2(searchText, 0, 1))) + $.S($.substring$1(searchText, 1));
  return new $.SearchText(searchText, t1, t2);
};

$.jsHasOwnProperty = function(jsObject, property) {
  return jsObject.hasOwnProperty(property);
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._HttpRequestUploadEventsImpl$ = function(_ptr) {
  return new $._HttpRequestUploadEventsImpl(_ptr);
};

$._WindowImpl__isDartLocation = function(thing) {
  try {
    var t1 = thing;
    return typeof t1 === 'object' && t1 !== null && t1.is$Location();
  } catch (exception) {
    $.unwrapException(exception);
    return false;
  }

};

$.DualPivotQuicksort__doSort = function(a, left, right, compare) {
  if ($.leB($.sub(right, left), 32))
    $.DualPivotQuicksort_insertionSort_(a, left, right, compare);
  else
    $.DualPivotQuicksort__dualPivotQuicksort(a, left, right, compare);
};

$.checkNull = function(object) {
  if (object == null)
    throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$._PeerConnection00EventsImpl$ = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._AbstractWorkerEventsImpl$ = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = index >>> 0;
    if (key === index && key < a.length) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0))) {
      if (!(typeof index === 'number'))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref)
      return true;
  }
  return false;
};

$.StringToken$ = function(info, value, charOffset) {
  return new $.StringToken($.StringWrapper$(value), info, charOffset, null);
};

$._MediaElementEventsImpl$ = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._MessagePortEventsImpl$ = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$._looksLikePrivateType = function(name$) {
  if ($.geB($.get$length(name$), 3))
    if ($.eqB($.index(name$, 0), '_')) {
      var t1 = $.index(name$, 1);
      if (!$.eqB($.toLowerCase(t1), t1)) {
        t1 = $.index(name$, 2);
        var t2 = !$.eqB($.toUpperCase(t1), t1);
        t1 = t2;
      } else
        t1 = false;
    } else
      t1 = false;
  else
    t1 = false;
  return t1;
};

$.setupLocation = function() {
  var body = $.document().query$1('body');
  $.currentLibrary = $.index(body.get$dataAttributes(), 'library');
  $.currentType = $.index(body.get$dataAttributes(), 'type');
  $.prefix = !($.currentType == null) ? '../' : '';
};

$.stringReplaceAllUnchecked = function(receiver, from, to) {
  if (from === '')
    if (receiver === '')
      return to;
    else {
      var result = $.StringBufferImpl$('');
      var length$ = receiver.length;
      result.add$1(to);
      for (var i = 0; i < length$; ++i) {
        if (i < 0 || i >= length$)
          throw $.ioore(i);
        result.add$1(receiver[i]);
        result.add$1(to);
      }
      return result.toString$0();
    }
  else
    return $.stringReplaceJS(receiver, $.regExpMakeNative($.JSSyntaxRegExp$(from.replace($.regExpMakeNative($.CTC18, true), "\\$&"), false, false), true), to);
};

$.LinkEntry$ = function(head, tail, T) {
  var t1 = new $.LinkEntry(head, tail);
  $.setRuntimeTypeInfo(t1, { 'T': T });
  return t1;
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = {};
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$.StringCodeIterator$ = function(string) {
  return new $.StringCodeIterator(string, 0, $.get$length(string));
};

$.SubstringWrapper$ = function(internalString, begin, end) {
  return new $.SubstringWrapper(internalString, begin, end);
};

$.propertySet = function(object, property, value) {
  object[property] = value;
};

$._BatteryManagerEventsImpl$ = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$._Device_isFirefox = function() {
  return $.contains$2($._Device_userAgent(), 'Firefox', 0);
};

$._IDBOpenDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBOpenDBRequestEventsImpl(_ptr);
};

$._LocationWrapper__toString = function(p) {
return p.toString();
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.JSSyntaxRegExp$ = function(pattern, multiLine, ignoreCase) {
  return new $.JSSyntaxRegExp(ignoreCase, multiLine, pattern);
};

$.getTypeUrl = function(libraryName, typeInfo) {
  return $.S($.prefix) + $.S($.replaceAll($.replaceAll(libraryName, ':', '_'), '/', '_')) + '/' + $.S($.replaceAll($.replaceAll($.index(typeInfo, 'name'), ':', '_'), '/', '_')) + '.html';
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = index >>> 0;
    if (key === index && key < a.length)
      return a[key];
  }
  return $.index$slow(a, index);
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a <= b;
  return a.operator$le$1(b);
};

$.LinkIterator$ = function(current, T) {
  var t1 = new $.LinkIterator(current);
  $.setRuntimeTypeInfo(t1, { 'T': T });
  return t1;
};

$.KeyValuePair$ = function(key, value, K, V) {
  var t1 = new $.KeyValuePair(key, value);
  $.setRuntimeTypeInfo(t1, { 'K': K, 'V': V });
  return t1;
};

$._DocumentEventsImpl$ = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.typeNameInOpera = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'FormData')
    return 'DOMFormData';
  return name$;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.showDropDown = function() {
  if ($.isEmpty($.currentResults) === true)
    $.hideDropDown();
  else
    $.dropdown.get$style().set$visibility('visible');
};

$._IDBVersionChangeRequestEventsImpl$ = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$.matchMembersInType = function(results, text, typeText, memberText) {
  var searchText = $.SearchText$(text);
  var typeSearchText = $.SearchText$(typeText);
  var memberSearchText = $.SearchText$(memberText);
  for (var t1 = $.iterator($.libraryList); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    var libraryName = $.index(t2, 'name');
    if (t2.containsKey$1('types') === true)
      for (var t3 = $.iterator($.index(t2, 'types')); t3.hasNext$0() === true;) {
        t2 = t3.next$0();
        var typeName = $.index(t2, 'name');
        var typeMatch = $.obtainMatch(typeSearchText, typeName);
        if (!(typeMatch == null))
          if (t2.containsKey$1('members') === true)
            for (var t4 = $.iterator($.index(t2, 'members')); t4.hasNext$0() === true;) {
              var t5 = t4.next$0();
              var constructorMatch = $.obtainMatch(searchText, $.index(t5, 'name'));
              if (!(constructorMatch == null))
                results.push($.Result$(constructorMatch, $.index(t5, 'kind'), $.getTypeMemberUrl(libraryName, typeName, t5), libraryName, null, null, null));
              else {
                var memberMatch = $.obtainMatch(memberSearchText, $.index(t5, 'name'));
                if (!(memberMatch == null))
                  results.push($.Result$(memberMatch, $.index(t5, 'kind'), $.getTypeMemberUrl(libraryName, typeName, t5), libraryName, null, $.index(t2, 'args'), typeMatch));
              }
            }
      }
  }
};

$.last = function(receiver) {
  if (!$.isJsArray(receiver))
    return receiver.last$0();
  return $.index(receiver, $.sub($.get$length(receiver), 1));
};

$.eq = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b);
  return a === b;
};

$.LinkedHashMapImplementation$ = function(K, V) {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  $.setRuntimeTypeInfo(t1, { 'K': K, 'V': V });
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(functionName, arguments$);
};

$._DoubleLinkedQueueEntrySentinel$ = function(E) {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$._DOMWindowCrossFrameImpl__createSafe = function(w) {
  var t1 = $.window();
  if (w == null ? t1 == null : w === t1)
    return w;
  else
    return $._DOMWindowCrossFrameImpl$(w);
};

$.toStringWrapper = function() {
  return $.toString(this.dartException);
};

$._ElementList$ = function(list) {
  return new $._ElementList(list);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b) === true;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  return !($.indexOf$2(receiver, other, startIndex) === -1);
};

$.KeywordState_KEYWORD_STATE = function() {
  if ($.KeywordState__KEYWORD_STATE == null) {
    var strings = $.ListImplementation_List(46, 'String');
    for (var i = 0; i < 46; ++i) {
      if (i < 0 || i >= 46)
        throw $.ioore(i);
      var t1 = $.CTC215[i].get$syntax();
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      strings[i] = t1;
    }
    $.sort(strings, new $.KeywordState_KEYWORD_STATE_anon());
    $.KeywordState__KEYWORD_STATE = $.KeywordState_computeKeywordStateTable(0, strings, 0, strings.length);
  }
  return $.KeywordState__KEYWORD_STATE;
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b);
};

$._FileWriterEventsImpl$ = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.enableCodeBlocks = function() {
  for (var t1 = $.iterator($.document().queryAll$1('.method, .field')); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    var showCode = t2.query$1('.show-code');
    if (showCode == null)
      continue;
    var pre = t2.query$1('pre.source');
    $.add$1(showCode.get$on().get$click(), new $.enableCodeBlocks_anon(pre));
  }
};

$.getLibraryMemberUrl = function(libraryName, memberInfo) {
  return $.S($.prefix) + $.S($.replaceAll($.replaceAll(libraryName, ':', '_'), '/', '_')) + '.html#' + $.S($.getMemberAnchor(memberInfo));
};

$._NotificationEventsImpl$ = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.regExpGetNative = function(regExp) {
  var r = regExp._re;
  return r == null ? regExp._re = $.regExpMakeNative(regExp, false) : r;
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a - b : $.sub$slow(a, b);
};

$.DoubleLinkedQueueEntry$ = function(e, E) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$.Arrays_indexOf$bailout = function(state, a, element, startIndex, endIndex) {
  if ($.geB(startIndex, $.get$length(a)))
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i)
    if ($.eqB($.index(a, i), element))
      return i;
  return -1;
};

$._Lists_indexOf$bailout = function(state, a, element, startIndex, endIndex) {
  if ($.geB(startIndex, $.get$length(a)))
    return -1;
  if ($.ltB(startIndex, 0))
    startIndex = 0;
  for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1))
    if ($.eqB($.index(a, i), element))
      return i;
  return -1;
};

$._Lists_getRange$bailout = function(state, a, start, length$, accumulator) {
  if ($.ltB(length$, 0))
    throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if ($.ltB(start, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = $.add(start, length$);
  if ($.gtB(end, $.get$length(a)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; $.ltB(i, end); i = $.add(i, 1))
    accumulator.push($.index(a, i));
  return accumulator;
};

$.DualPivotQuicksort__dualPivotQuicksort$bailout = function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13) {
  switch (state) {
    case 1:
      var a = env0;
      var left = env1;
      var right = env2;
      var compare = env3;
      break;
    case 2:
      a = env0;
      left = env1;
      compare = env2;
      less = env3;
      k = env4;
      index1 = env5;
      index5 = env6;
      el2 = env7;
      pivots_are_equal = env8;
      right = env9;
      ak = env10;
      comp = env11;
      el4 = env12;
      great = env13;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var sixth = $.tdiv($.add($.sub(right, left), 1), 6);
      if (typeof sixth !== 'number')
        throw $.iae(sixth);
      var index1 = left + sixth;
      var index5 = $.sub(right, sixth);
      if (typeof right !== 'number')
        throw $.iae(right);
      var index3 = $.tdiv(left + right, 2);
      var index2 = index3 - sixth;
      var index4 = index3 + sixth;
      var el1 = $.index(a, index1);
      var el2 = $.index(a, index2);
      var el3 = $.index(a, index3);
      var el4 = $.index(a, index4);
      var el5 = $.index(a, index5);
      if ($.gtB(compare.call$2(el1, el2), 0)) {
        var t0 = el1;
        el1 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.call$2(el4, el5), 0)) {
        t0 = el5;
        el5 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.call$2(el1, el3), 0)) {
        t0 = el3;
        el3 = el1;
        el1 = t0;
      }
      if ($.gtB(compare.call$2(el2, el3), 0)) {
        t0 = el3;
        el3 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.call$2(el1, el4), 0)) {
        t0 = el1;
        el1 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.call$2(el3, el4), 0)) {
        t0 = el3;
        el3 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.call$2(el2, el5), 0)) {
        t0 = el5;
        el5 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.call$2(el2, el3), 0)) {
        t0 = el3;
        el3 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.call$2(el4, el5), 0)) {
        t0 = el5;
        el5 = el4;
        el4 = t0;
      }
      $.indexSet(a, index1, el1);
      $.indexSet(a, index3, el3);
      $.indexSet(a, index5, el5);
      $.indexSet(a, index2, $.index(a, left));
      $.indexSet(a, index4, $.index(a, right));
      var less = left + 1;
      var great = right - 1;
      var pivots_are_equal = $.eqB(compare.call$2(el2, el4), 0);
    case 2:
      if (state === 2 || state === 0 && pivots_are_equal)
        switch (state) {
          case 0:
            var k = less;
          case 2:
            L0:
              while (true)
                switch (state) {
                  case 0:
                    if (!(k <= great))
                      break L0;
                  case 2:
                    c$0: {
                      switch (state) {
                        case 0:
                          var ak = $.index(a, k);
                          var comp = compare.call$2(ak, el2);
                        case 2:
                          state = 0;
                          if ($.eqB(comp, 0))
                            break c$0;
                          if ($.ltB(comp, 0)) {
                            if (!(k === less)) {
                              $.indexSet(a, k, $.index(a, less));
                              $.indexSet(a, less, ak);
                            }
                            ++less;
                          } else
                            for (var less0 = less + 1; true;) {
                              comp = compare.call$2($.index(a, great), el2);
                              if ($.gtB(comp, 0)) {
                                --great;
                                continue;
                              } else if ($.ltB(comp, 0)) {
                                $.indexSet(a, k, $.index(a, less));
                                $.indexSet(a, less, $.index(a, great));
                                var great0 = great - 1;
                                $.indexSet(a, great, ak);
                                great = great0;
                                less = less0;
                                break;
                              } else {
                                $.indexSet(a, k, $.index(a, great));
                                great0 = great - 1;
                                $.indexSet(a, great, ak);
                                great = great0;
                                break;
                              }
                            }
                      }
                    }
                    ++k;
                }
        }
      else
        for (k = less; k <= great; ++k) {
          ak = $.index(a, k);
          if ($.ltB(compare.call$2(ak, el2), 0)) {
            if (!(k === less)) {
              $.indexSet(a, k, $.index(a, less));
              $.indexSet(a, less, ak);
            }
            ++less;
          } else if ($.gtB(compare.call$2(ak, el4), 0))
            for (less0 = less + 1; true;)
              if ($.gtB(compare.call$2($.index(a, great), el4), 0)) {
                --great;
                if (great < k)
                  break;
                continue;
              } else {
                if ($.ltB(compare.call$2($.index(a, great), el2), 0)) {
                  $.indexSet(a, k, $.index(a, less));
                  $.indexSet(a, less, $.index(a, great));
                  great0 = great - 1;
                  $.indexSet(a, great, ak);
                  great = great0;
                  less = less0;
                } else {
                  $.indexSet(a, k, $.index(a, great));
                  great0 = great - 1;
                  $.indexSet(a, great, ak);
                  great = great0;
                }
                break;
              }
        }
      var t1 = less - 1;
      $.indexSet(a, left, $.index(a, t1));
      $.indexSet(a, t1, el2);
      $.indexSet(a, right, $.index(a, great + 1));
      $.indexSet(a, great + 1, el4);
      $.DualPivotQuicksort__doSort(a, left, less - 2, compare);
      $.DualPivotQuicksort__doSort(a, great + 2, right, compare);
      if (pivots_are_equal)
        return;
      if (less < index1 && $.gtB(great, index5)) {
        for (; $.eqB(compare.call$2($.index(a, less), el2), 0);)
          ++less;
        for (; $.eqB(compare.call$2($.index(a, great), el4), 0);)
          --great;
        for (k = less; k <= great; ++k) {
          ak = $.index(a, k);
          if ($.eqB(compare.call$2(ak, el2), 0)) {
            if (!(k === less)) {
              $.indexSet(a, k, $.index(a, less));
              $.indexSet(a, less, ak);
            }
            ++less;
          } else if ($.eqB(compare.call$2(ak, el4), 0))
            for (less0 = less + 1; true;)
              if ($.eqB(compare.call$2($.index(a, great), el4), 0)) {
                --great;
                if (great < k)
                  break;
                continue;
              } else {
                if ($.ltB(compare.call$2($.index(a, great), el2), 0)) {
                  $.indexSet(a, k, $.index(a, less));
                  $.indexSet(a, less, $.index(a, great));
                  great0 = great - 1;
                  $.indexSet(a, great, ak);
                  great = great0;
                  less = less0;
                } else {
                  $.indexSet(a, k, $.index(a, great));
                  great0 = great - 1;
                  $.indexSet(a, great, ak);
                  great = great0;
                }
                break;
              }
        }
        $.DualPivotQuicksort__doSort(a, less, great, compare);
      } else
        $.DualPivotQuicksort__doSort(a, less, great, compare);
  }
};

$.KeywordState_computeKeywordStateTable$bailout = function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10) {
  switch (state) {
    case 1:
      var start = env0;
      var strings = env1;
      var offset = env2;
      i = env3;
      t2 = env4;
      result = env5;
      chunk = env6;
      chunkStart = env7;
      isLeaf = env8;
      t3 = env9;
      t1 = env10;
      break;
    case 2:
      isLeaf = env0;
      strings = env1;
      offset = env2;
      i = env3;
      t2 = env4;
      t3 = env5;
      start = env6;
      result = env7;
      chunk = env8;
      chunkStart = env9;
      t1 = env10;
      break;
    case 3:
      isLeaf = env0;
      strings = env1;
      offset = env2;
      i = env3;
      t2 = env4;
      start = env5;
      result = env6;
      chunk = env7;
      chunkStart = env8;
      t1 = env9;
      c = env10;
      break;
  }
  switch (state) {
    case 0:
      var result = $.ListImplementation_List(26, 'KeywordState');
      var t1 = offset + length$;
      var t2 = start + 1;
      var i = offset;
      var isLeaf = false;
      var chunk = 0;
      var chunkStart = -1;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!(i < t1))
                break L0;
              if (i < 0 || i >= strings.length)
                throw $.ioore(i);
              var t3 = $.get$length(strings[i]);
            case 1:
              state = 0;
              if ($.eqB(t3, start))
                isLeaf = true;
              if (i < 0 || i >= strings.length)
                throw $.ioore(i);
              t3 = $.get$length(strings[i]);
            case 2:
              state = 0;
            case 3:
              if (state === 3 || state === 0 && $.gtB(t3, start))
                switch (state) {
                  case 0:
                    if (i < 0 || i >= strings.length)
                      throw $.ioore(i);
                    var c = $.charCodeAt(strings[i], start);
                  case 3:
                    state = 0;
                    if (!$.eqB(chunk, c)) {
                      if (!(chunkStart === -1)) {
                        t3 = $.sub(chunk, 97);
                        var t4 = $.KeywordState_computeKeywordStateTable(t2, strings, chunkStart, i - chunkStart);
                        if (t3 !== (t3 | 0))
                          throw $.iae(t3);
                        if (t3 < 0 || t3 >= result.length)
                          throw $.ioore(t3);
                        result[t3] = t4;
                      }
                      chunk = c;
                      chunkStart = i;
                    }
                }
              ++i;
          }
      if (!(chunkStart === -1)) {
        t3 = $.sub(chunk, 97);
        t2 = $.KeywordState_computeKeywordStateTable(t2, strings, chunkStart, t1 - chunkStart);
        if (t3 !== (t3 | 0))
          throw $.iae(t3);
        if (t3 < 0 || t3 >= result.length)
          throw $.ioore(t3);
        result[t3] = t2;
      } else {
        if (offset < 0 || offset >= strings.length)
          throw $.ioore(offset);
        return $.LeafKeywordState$(strings[offset]);
      }
      if (isLeaf) {
        if (offset < 0 || offset >= strings.length)
          throw $.ioore(offset);
        return $.ArrayKeywordState$(result, strings[offset]);
      } else
        return $.ArrayKeywordState$(result, null);
  }
};

$.StringImplementation__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings)) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListImplementation_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      if (i < 0 || i >= array.length)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.DualPivotQuicksort_insertionSort_$bailout = function(state, a, left, right, compare) {
  for (var i = left + 1; $.leB(i, right); ++i) {
    var el = $.index(a, i);
    var j = i;
    while (true) {
      if (!(j > left && $.gtB(compare.call$2($.index(a, j - 1), el), 0)))
        break;
      var j0 = j - 1;
      $.indexSet(a, j, $.index(a, j0));
      j = j0;
    }
    $.indexSet(a, j, el);
  }
};

$.toStringWrapper.call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.updateDropDown.call$1 = $.updateDropDown;
$.updateDropDown.$name = "updateDropDown";
$.constructorNameFallback.call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
$.typeNameInIE.call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.shortcutHandler.call$1 = $.shortcutHandler;
$.shortcutHandler.$name = "shortcutHandler";
$.resultComparator.call$2 = $.resultComparator;
$.resultComparator.$name = "resultComparator";
$.dynamicBind.call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.typeNameInFirefox.call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.typeNameInSafari.call$1 = $.typeNameInSafari;
$.typeNameInSafari.$name = "typeNameInSafari";
$.typeNameInChrome.call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.typeNameInOpera.call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
$.handleUpDown.call$1 = $.handleUpDown;
$.handleUpDown.$name = "handleUpDown";
$.invokeClosure.call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC22 = new Isolate.$isolateProperties.ConstantMap(0, {}, Isolate.$isolateProperties.CTC);
$.CTC98 = new Isolate.$isolateProperties.StringWrapper('||');
$.CTC99 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC98, 4, 147);
$.CTC146 = new Isolate.$isolateProperties.StringWrapper('>>=');
$.CTC85 = new Isolate.$isolateProperties.StringWrapper('keyword');
$.CTC86 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC85, 0, 107);
$.CTC211 = new Isolate.$isolateProperties.Keyword('set', true, Isolate.$isolateProperties.CTC86);
$.CTC14 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC122 = new Isolate.$isolateProperties.StringWrapper('-');
$.CTC123 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC122, 12, 45);
$.CTC203 = new Isolate.$isolateProperties.Keyword('factory', true, Isolate.$isolateProperties.CTC86);
$.CTC77 = new Isolate.$isolateProperties.StringWrapper('#');
$.CTC78 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC77, 0, 35);
$.CTC33 = new Isolate.$isolateProperties.StringWrapper(')');
$.CTC34 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC33, 0, 41);
$.CTC128 = new Isolate.$isolateProperties.StringWrapper('+');
$.CTC59 = new Isolate.$isolateProperties.StringWrapper('double');
$.CTC4 = new Isolate.$isolateProperties.NotImplementedException('structured clone of RegExp');
$.CTC87 = new Isolate.$isolateProperties.Keyword('operator', true, Isolate.$isolateProperties.CTC86);
$.CTC100 = new Isolate.$isolateProperties.StringWrapper('|=');
$.CTC101 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC100, 1, 148);
$.CTC194 = new Isolate.$isolateProperties.Keyword('try', false, Isolate.$isolateProperties.CTC86);
$.CTC43 = new Isolate.$isolateProperties.StringWrapper(']');
$.CTC44 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC43, 0, 93);
$.CTC124 = new Isolate.$isolateProperties.StringWrapper('++');
$.CTC106 = new Isolate.$isolateProperties.StringWrapper('&=');
$.CTC120 = new Isolate.$isolateProperties.StringWrapper('-=');
$.CTC121 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC120, 1, 153);
$.CTC21 = new Isolate.$isolateProperties.UnsupportedOperationException('frozen class set cannot be modified');
$.CTC102 = new Isolate.$isolateProperties.StringWrapper('|');
$.CTC8 = new Isolate.$isolateProperties.NotImplementedException('structured clone of ArrayBuffer');
$.CTC23 = new Isolate.$isolateProperties.IllegalAccessException();
$.CTC175 = new Isolate.$isolateProperties.Keyword('do', false, Isolate.$isolateProperties.CTC86);
$.CTC188 = new Isolate.$isolateProperties.Keyword('return', false, Isolate.$isolateProperties.CTC86);
$.CTC11 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC13 = new Isolate.$isolateProperties.EmptyQueueException();
$.CTC180 = new Isolate.$isolateProperties.Keyword('for', false, Isolate.$isolateProperties.CTC86);
$.CTC16 = new Isolate.$isolateProperties.UnsupportedOperationException('');
$.CTC67 = new Isolate.$isolateProperties.StringWrapper('${');
$.CTC96 = new Isolate.$isolateProperties.StringWrapper('^');
$.CTC97 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC96, 7, 94);
$.CTC116 = new Isolate.$isolateProperties.StringWrapper('*');
$.CTC117 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC116, 13, 42);
$.CTC118 = new Isolate.$isolateProperties.StringWrapper('--');
$.CTC148 = new Isolate.$isolateProperties.StringWrapper('>>>=');
$.CTC149 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC148, 1, 140);
$.CTC160 = new Isolate.$isolateProperties.StringWrapper('<<');
$.CTC161 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC160, 11, 137);
$.CTC166 = new Isolate.$isolateProperties.StringWrapper('as');
$.CTC167 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC166, 10, 160);
$.CTC168 = new Isolate.$isolateProperties.Keyword('as', true, Isolate.$isolateProperties.CTC167);
$.CTC169 = new Isolate.$isolateProperties.Keyword('break', false, Isolate.$isolateProperties.CTC86);
$.CTC170 = new Isolate.$isolateProperties.Keyword('case', false, Isolate.$isolateProperties.CTC86);
$.CTC171 = new Isolate.$isolateProperties.Keyword('catch', false, Isolate.$isolateProperties.CTC86);
$.CTC172 = new Isolate.$isolateProperties.Keyword('const', false, Isolate.$isolateProperties.CTC86);
$.CTC173 = new Isolate.$isolateProperties.Keyword('continue', false, Isolate.$isolateProperties.CTC86);
$.CTC174 = new Isolate.$isolateProperties.Keyword('default', false, Isolate.$isolateProperties.CTC86);
$.CTC176 = new Isolate.$isolateProperties.Keyword('else', false, Isolate.$isolateProperties.CTC86);
$.CTC177 = new Isolate.$isolateProperties.Keyword('false', false, Isolate.$isolateProperties.CTC86);
$.CTC178 = new Isolate.$isolateProperties.Keyword('final', false, Isolate.$isolateProperties.CTC86);
$.CTC179 = new Isolate.$isolateProperties.Keyword('finally', false, Isolate.$isolateProperties.CTC86);
$.CTC181 = new Isolate.$isolateProperties.Keyword('if', false, Isolate.$isolateProperties.CTC86);
$.CTC182 = new Isolate.$isolateProperties.Keyword('in', false, Isolate.$isolateProperties.CTC86);
$.CTC183 = new Isolate.$isolateProperties.StringWrapper('is');
$.CTC184 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC183, 10, 159);
$.CTC185 = new Isolate.$isolateProperties.Keyword('is', false, Isolate.$isolateProperties.CTC184);
$.CTC186 = new Isolate.$isolateProperties.Keyword('new', false, Isolate.$isolateProperties.CTC86);
$.CTC187 = new Isolate.$isolateProperties.Keyword('null', false, Isolate.$isolateProperties.CTC86);
$.CTC189 = new Isolate.$isolateProperties.Keyword('super', false, Isolate.$isolateProperties.CTC86);
$.CTC190 = new Isolate.$isolateProperties.Keyword('switch', false, Isolate.$isolateProperties.CTC86);
$.CTC191 = new Isolate.$isolateProperties.Keyword('this', false, Isolate.$isolateProperties.CTC86);
$.CTC192 = new Isolate.$isolateProperties.Keyword('throw', false, Isolate.$isolateProperties.CTC86);
$.CTC193 = new Isolate.$isolateProperties.Keyword('true', false, Isolate.$isolateProperties.CTC86);
$.CTC195 = new Isolate.$isolateProperties.Keyword('var', false, Isolate.$isolateProperties.CTC86);
$.CTC196 = new Isolate.$isolateProperties.Keyword('void', false, Isolate.$isolateProperties.CTC86);
$.CTC197 = new Isolate.$isolateProperties.Keyword('while', false, Isolate.$isolateProperties.CTC86);
$.CTC198 = new Isolate.$isolateProperties.Keyword('abstract', true, Isolate.$isolateProperties.CTC86);
$.CTC199 = new Isolate.$isolateProperties.Keyword('assert', true, Isolate.$isolateProperties.CTC86);
$.CTC200 = new Isolate.$isolateProperties.Keyword('class', false, Isolate.$isolateProperties.CTC86);
$.CTC201 = new Isolate.$isolateProperties.Keyword('extends', false, Isolate.$isolateProperties.CTC86);
$.CTC202 = new Isolate.$isolateProperties.Keyword('external', true, Isolate.$isolateProperties.CTC86);
$.CTC204 = new Isolate.$isolateProperties.Keyword('get', true, Isolate.$isolateProperties.CTC86);
$.CTC205 = new Isolate.$isolateProperties.Keyword('implements', true, Isolate.$isolateProperties.CTC86);
$.CTC206 = new Isolate.$isolateProperties.Keyword('import', true, Isolate.$isolateProperties.CTC86);
$.CTC207 = new Isolate.$isolateProperties.Keyword('interface', true, Isolate.$isolateProperties.CTC86);
$.CTC208 = new Isolate.$isolateProperties.Keyword('library', true, Isolate.$isolateProperties.CTC86);
$.CTC209 = new Isolate.$isolateProperties.Keyword('native', true, Isolate.$isolateProperties.CTC86);
$.CTC210 = new Isolate.$isolateProperties.Keyword('on', true, Isolate.$isolateProperties.CTC86);
$.CTC212 = new Isolate.$isolateProperties.Keyword('source', true, Isolate.$isolateProperties.CTC86);
$.CTC213 = new Isolate.$isolateProperties.Keyword('static', true, Isolate.$isolateProperties.CTC86);
$.CTC214 = new Isolate.$isolateProperties.Keyword('typedef', true, Isolate.$isolateProperties.CTC86);
$.CTC215 = Isolate.makeConstantList([Isolate.$isolateProperties.CTC168, Isolate.$isolateProperties.CTC169, Isolate.$isolateProperties.CTC170, Isolate.$isolateProperties.CTC171, Isolate.$isolateProperties.CTC172, Isolate.$isolateProperties.CTC173, Isolate.$isolateProperties.CTC174, Isolate.$isolateProperties.CTC175, Isolate.$isolateProperties.CTC176, Isolate.$isolateProperties.CTC177, Isolate.$isolateProperties.CTC178, Isolate.$isolateProperties.CTC179, Isolate.$isolateProperties.CTC180, Isolate.$isolateProperties.CTC181, Isolate.$isolateProperties.CTC182, Isolate.$isolateProperties.CTC185, Isolate.$isolateProperties.CTC186, Isolate.$isolateProperties.CTC187, Isolate.$isolateProperties.CTC188, Isolate.$isolateProperties.CTC189, Isolate.$isolateProperties.CTC190, Isolate.$isolateProperties.CTC191, Isolate.$isolateProperties.CTC192, Isolate.$isolateProperties.CTC193, Isolate.$isolateProperties.CTC194, Isolate.$isolateProperties.CTC195, Isolate.$isolateProperties.CTC196, Isolate.$isolateProperties.CTC197, Isolate.$isolateProperties.CTC198, Isolate.$isolateProperties.CTC199, Isolate.$isolateProperties.CTC200, Isolate.$isolateProperties.CTC201, Isolate.$isolateProperties.CTC202, Isolate.$isolateProperties.CTC203, Isolate.$isolateProperties.CTC204, Isolate.$isolateProperties.CTC205, Isolate.$isolateProperties.CTC206, Isolate.$isolateProperties.CTC207, Isolate.$isolateProperties.CTC208, Isolate.$isolateProperties.CTC209, Isolate.$isolateProperties.CTC87, Isolate.$isolateProperties.CTC210, Isolate.$isolateProperties.CTC211, Isolate.$isolateProperties.CTC212, Isolate.$isolateProperties.CTC213, Isolate.$isolateProperties.CTC214]);
$.CTC47 = new Isolate.$isolateProperties.StringWrapper('{');
$.CTC48 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC47, 0, 123);
$.CTC88 = new Isolate.$isolateProperties.StringWrapper('[]=');
$.CTC89 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC88, 0, 141);
$.CTC132 = new Isolate.$isolateProperties.StringWrapper('!=');
$.CTC57 = new Isolate.$isolateProperties.StringWrapper('.');
$.CTC81 = new Isolate.$isolateProperties.StringWrapper('~/');
$.CTC82 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC81, 13, 155);
$.CTC130 = new Isolate.$isolateProperties.StringWrapper('!==');
$.CTC131 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC130, 9, 143);
$.CTC217 = new Isolate.$isolateProperties.Object();
$.CTC94 = new Isolate.$isolateProperties.StringWrapper('^=');
$.CTC95 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC94, 1, 158);
$.CTC90 = new Isolate.$isolateProperties.StringWrapper('[]');
$.CTC91 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC90, 0, 142);
$.CTC154 = new Isolate.$isolateProperties.StringWrapper('>');
$.CTC55 = new Isolate.$isolateProperties.StringWrapper('..');
$.CTC56 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC55, 2, 133);
$.CTC142 = new Isolate.$isolateProperties.StringWrapper('=');
$.CTC143 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC142, 1, 61);
$.CTC63 = new Isolate.$isolateProperties.StringWrapper('string');
$.CTC64 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC63, 0, 39);
$.CTC2 = new Isolate.$isolateProperties._Default();
$.CTC29 = new Isolate.$isolateProperties.StringWrapper('\\');
$.CTC65 = new Isolate.$isolateProperties.StringWrapper('$');
$.CTC27 = new Isolate.$isolateProperties.StringWrapper('EOF');
$.CTC28 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC27, 0, 0);
$.CTC75 = new Isolate.$isolateProperties.StringWrapper('comment');
$.CTC10 = new Isolate.$isolateProperties.NotImplementedException('structured clone of other type');
$.CTC61 = new Isolate.$isolateProperties.StringWrapper('hexadecimal');
$.CTC62 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC61, 0, 120);
$.CTC114 = new Isolate.$isolateProperties.StringWrapper('*=');
$.CTC134 = new Isolate.$isolateProperties.StringWrapper('!');
$.CTC104 = new Isolate.$isolateProperties.StringWrapper('&&');
$.CTC112 = new Isolate.$isolateProperties.StringWrapper('%');
$.CTC113 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC112, 13, 37);
$.CTC138 = new Isolate.$isolateProperties.StringWrapper('==');
$.CTC139 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC138, 9, 135);
$.CTC49 = new Isolate.$isolateProperties.StringWrapper('}');
$.CTC73 = new Isolate.$isolateProperties.StringWrapper('/');
$.CTC136 = new Isolate.$isolateProperties.StringWrapper('===');
$.CTC137 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC136, 9, 134);
$.CTC15 = new Isolate.$isolateProperties.NotImplementedException('IDBKey containing Date');
$.CTC35 = new Isolate.$isolateProperties.StringWrapper(',');
$.CTC36 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC35, 0, 44);
$.CTC144 = new Isolate.$isolateProperties.StringWrapper('>=');
$.CTC71 = new Isolate.$isolateProperties.StringWrapper('/=');
$.CTC126 = new Isolate.$isolateProperties.StringWrapper('+=');
$.CTC127 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC126, 1, 151);
$.CTC45 = new Isolate.$isolateProperties.StringWrapper('`');
$.CTC46 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC45, 0, 96);
$.CTC37 = new Isolate.$isolateProperties.StringWrapper(':');
$.CTC53 = new Isolate.$isolateProperties.StringWrapper('...');
$.CTC69 = new Isolate.$isolateProperties.StringWrapper('@');
$.CTC51 = new Isolate.$isolateProperties.StringWrapper('int');
$.CTC52 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC51, 0, 105);
$.CTC39 = new Isolate.$isolateProperties.StringWrapper(';');
$.CTC40 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC39, 0, 59);
$.CTC83 = new Isolate.$isolateProperties.StringWrapper('~');
$.CTC84 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC83, 0, 126);
$.CTC152 = new Isolate.$isolateProperties.StringWrapper('>>');
$.CTC140 = new Isolate.$isolateProperties.StringWrapper('=>');
$.CTC150 = new Isolate.$isolateProperties.StringWrapper('>>>');
$.CTC151 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC150, 11, 162);
$.CTC156 = new Isolate.$isolateProperties.StringWrapper('<=');
$.CTC157 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC156, 10, 129);
$.CTC79 = new Isolate.$isolateProperties.StringWrapper('~/=');
$.CTC80 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC79, 1, 154);
$.CTC110 = new Isolate.$isolateProperties.StringWrapper('%=');
$.CTC111 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC110, 1, 156);
$.CTC164 = new Isolate.$isolateProperties.StringWrapper('identifier');
$.CTC108 = new Isolate.$isolateProperties.StringWrapper('&');
$.CTC109 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC108, 8, 38);
$.CTC17 = new Isolate.$isolateProperties.IllegalArgumentException('Invalid list length');
$.CTC158 = new Isolate.$isolateProperties.StringWrapper('<<=');
$.CTC41 = new Isolate.$isolateProperties.StringWrapper('?');
$.CTC92 = new Isolate.$isolateProperties.StringWrapper('[');
$.CTC93 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC92, 14, 91);
$.CTC162 = new Isolate.$isolateProperties.StringWrapper('<');
$.CTC163 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC162, 10, 60);
$.CTC9 = new Isolate.$isolateProperties.NotImplementedException('structured clone of ArrayBufferView');
$.CTC31 = new Isolate.$isolateProperties.StringWrapper('(');
$.CTC135 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC134, 0, 33);
$.CTC125 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC124, 14, 150);
$.CTC107 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC106, 1, 146);
$.CTC6 = new Isolate.$isolateProperties.NotImplementedException('structured clone of Blob');
$.CTC74 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC73, 13, 47);
$.CTC70 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC69, 0, 64);
$.CTC165 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC164, 0, 97);
$.CTC147 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC146, 1, 139);
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(null, Isolate.$isolateProperties.CTC);
$.CTC26 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^[*a-zA-Z0-9]+$');
$.CTC12 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot removeLast on immutable List.');
$.CTC50 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC49, 0, 125);
$.CTC38 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC37, 0, 58);
$.CTC25 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^\\[name=["\'][^\'"]+[\'"]\\]$');
$.CTC42 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC41, 3, 63);
$.CTC68 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC67, 0, 128);
$.CTC133 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC132, 9, 144);
$.CTC30 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC29, 0, 92);
$.CTC119 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC118, 14, 152);
$.CTC32 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC31, 14, 40);
$.CTC76 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC75, 0, 161);
$.CTC66 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC65, 0, 162);
$.CTC72 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC71, 1, 131);
$.CTC18 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '[-[\\]{}()*+?.,\\\\^$|#\\s]');
$.CTC129 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC128, 12, 43);
$.CTC7 = new Isolate.$isolateProperties.NotImplementedException('structured clone of FileList');
$.CTC145 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC144, 10, 138);
$.CTC105 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC104, 5, 145);
$.CTC216 = new Isolate.$isolateProperties.LinkTail();
$.CTC3 = new Isolate.$isolateProperties.NotImplementedException('structured clone of Date');
$.CTC19 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot sort immutable List.');
$.CTC115 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC114, 1, 149);
$.CTC5 = new Isolate.$isolateProperties.NotImplementedException('structured clone of File');
$.CTC58 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC57, 14, 46);
$.CTC24 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC159 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC158, 1, 136);
$.CTC60 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC59, 0, 100);
$.CTC153 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC152, 11, 157);
$.CTC155 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC154, 10, 62);
$.CTC54 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC53, 0, 132);
$.CTC1 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot add to immutable List.');
$.CTC20 = new Isolate.$isolateProperties.UnsupportedOperationException('TODO(jacobr): should we impl?');
$.CTC103 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC102, 6, 124);
$.CTC141 = new Isolate.$isolateProperties.PrecedenceInfo(Isolate.$isolateProperties.CTC140, 0, 130);
$.Keyword_FINALLY = Isolate.$isolateProperties.CTC179;
$.Keyword_WHILE = Isolate.$isolateProperties.CTC197;
$.PERCENT_INFO = Isolate.$isolateProperties.CTC113;
$._currentResult = null;
$.Keyword_SOURCE = Isolate.$isolateProperties.CTC212;
$.DOUBLE_TOKEN = 100;
$.INDEX_EQ_INFO = Isolate.$isolateProperties.CTC89;
$.FIELD = 'field';
$._JsonParser_CHAR_CAPITAL_E = 69;
$.Keyword_DO = Isolate.$isolateProperties.CTC175;
$._JsonParser_TAB = 9;
$.COMMA_INFO = Isolate.$isolateProperties.CTC36;
$.Keyword_FOR = Isolate.$isolateProperties.CTC180;
$.$$LF = 10;
$._JsonParser_FALSE_STRING = 'false';
$.INT_TOKEN = 105;
$.$$6 = 54;
$.TILDE_SLASH_INFO = Isolate.$isolateProperties.CTC82;
$.$$HASH = 35;
$.Keyword_THROW = Isolate.$isolateProperties.CTC192;
$.$$STX = 2;
$.PLUS_PLUS_TOKEN = 150;
$.$$CLOSE_SQUARE_BRACKET = 93;
$._JsonParser_CHAR_N = 110;
$._JsonParser_DOT = 46;
$._JsonParser_QUOTE = 34;
$.HEXADECIMAL_TOKEN = 120;
$.Keyword_IMPORT = Isolate.$isolateProperties.CTC206;
$.prefix = '';
$.HttpRequest_DONE = 4;
$.KeyName_ENTER = 'Enter';
$.$$COMMA = 44;
$.$$a = 97;
$.LIBRARY = 'library';
$.Keyword_LIBRARY = Isolate.$isolateProperties.CTC208;
$.GT_GT_GT_TOKEN = 162;
$.STRING_INTERPOLATION_TOKEN = 128;
$.PERIOD_TOKEN = 46;
$.IS_INFO = Isolate.$isolateProperties.CTC184;
$.Keyword_IS = Isolate.$isolateProperties.CTC185;
$._JsonParser_CHAR_E = 101;
$.Keyword_IF = Isolate.$isolateProperties.CTC181;
$._JsonParser_MINUS = 45;
$.MINUS_MINUS_TOKEN = 152;
$._JsonParser_CHAR_2 = 50;
$.PLUS_EQ_INFO = Isolate.$isolateProperties.CTC127;
$.KeyName_DOWN = 'Down';
$.LT_LT_EQ_INFO = Isolate.$isolateProperties.CTC159;
$.AMPERSAND_AMPERSAND_TOKEN = 145;
$.$$F = 70;
$.PLUS_EQ_TOKEN = 151;
$.$$e = 101;
$._JsonParser_CHAR_7 = 55;
$._JsonParser_NULL_LITERAL = 110;
$._JsonParser_CHAR_3 = 51;
$.AT_INFO = Isolate.$isolateProperties.CTC70;
$.QUESTION_INFO = Isolate.$isolateProperties.CTC42;
$.Keyword_SET = Isolate.$isolateProperties.CTC211;
$.Keyword_EXTENDS = Isolate.$isolateProperties.CTC201;
$.CLOSE_CURLY_BRACKET_TOKEN = 125;
$.Keyword_EXTERNAL = Isolate.$isolateProperties.CTC202;
$._JsonParser_COLON = 58;
$.INDEX_TOKEN = 142;
$.Keyword_FALSE = Isolate.$isolateProperties.CTC177;
$.$$3 = 51;
$._JsonParser_FALSE_LITERAL = 102;
$._JsonParser_TRUE_LITERAL = 116;
$.BANG_EQ_INFO = Isolate.$isolateProperties.CTC133;
$.Keyword_AS = Isolate.$isolateProperties.CTC168;
$.STRING_INFO = Isolate.$isolateProperties.CTC64;
$.EQ_EQ_EQ_INFO = Isolate.$isolateProperties.CTC137;
$._JsonParser_SPACE = 32;
$.BAR_BAR_INFO = Isolate.$isolateProperties.CTC99;
$.BANG_EQ_EQ_INFO = Isolate.$isolateProperties.CTC131;
$.IDENTIFIER_TOKEN = 97;
$.MINUS_MINUS_INFO = Isolate.$isolateProperties.CTC119;
$.EQ_INFO = Isolate.$isolateProperties.CTC143;
$.STRING_INTERPOLATION_INFO = Isolate.$isolateProperties.CTC68;
$.PLUS_INFO = Isolate.$isolateProperties.CTC129;
$.$$i = 105;
$.$$Z = 90;
$.$$PERCENT = 37;
$.PERIOD_PERIOD_PERIOD_TOKEN = 132;
$.Keyword_NULL = Isolate.$isolateProperties.CTC187;
$.STAR_EQ_INFO = Isolate.$isolateProperties.CTC115;
$.SLASH_TOKEN = 47;
$.EQ_EQ_EQ_TOKEN = 134;
$.$$PERIOD = 46;
$.LT_TOKEN = 60;
$._JsonParser_CHAR_U = 117;
$.BANG_EQ_TOKEN = 144;
$.$$SEMICOLON = 59;
$.LT_EQ_INFO = Isolate.$isolateProperties.CTC157;
$.Keyword_ON = Isolate.$isolateProperties.CTC210;
$.$$CARET = 94;
$.$$x = 120;
$.$$E = 69;
$.KeyName_UP = 'Up';
$.CLOSE_CURLY_BRACKET_INFO = Isolate.$isolateProperties.CTC50;
$.METHOD = 'method';
$._JsonParser_NUMBER_LITERAL = 45;
$.TILDE_INFO = Isolate.$isolateProperties.CTC84;
$.$$SLASH = 47;
$.$$9 = 57;
$.CARET_INFO = Isolate.$isolateProperties.CTC97;
$.STAR_EQ_TOKEN = 149;
$.$$BANG = 33;
$.BACKPING_TOKEN = 96;
$.KEYWORD_TOKEN = 107;
$.FUNCTION_INFO = Isolate.$isolateProperties.CTC141;
$._JsonParser_tokens = null;
$.CONSTRUCTOR = 'constructor';
$.Keyword_NATIVE = Isolate.$isolateProperties.CTC209;
$._JsonParser_BACKSPACE = 8;
$._JsonParser_CHAR_1 = 49;
$.SLASH_INFO = Isolate.$isolateProperties.CTC74;
$.GT_INFO = Isolate.$isolateProperties.CTC155;
$.OPEN_SQUARE_BRACKET_INFO = Isolate.$isolateProperties.CTC93;
$.SEMICOLON_INFO = Isolate.$isolateProperties.CTC40;
$.AS_TOKEN = 160;
$.Keyword_THIS = Isolate.$isolateProperties.CTC191;
$.STAR_INFO = Isolate.$isolateProperties.CTC117;
$.TILDE_SLASH_EQ_INFO = Isolate.$isolateProperties.CTC80;
$.HASH_INFO = Isolate.$isolateProperties.CTC78;
$.BANG_EQ_EQ_TOKEN = 143;
$._JsonParser_RBRACKET = 93;
$.UNKNOWN_TOKEN = 1024;
$._currentResultIndex = null;
$.INT_INFO = Isolate.$isolateProperties.CTC52;
$.MINUS_EQ_TOKEN = 153;
$.Keyword_CATCH = Isolate.$isolateProperties.CTC171;
$.libraryList = null;
$.COLON_INFO = Isolate.$isolateProperties.CTC38;
$.$$$ = 36;
$.$$BACKSLASH = 92;
$.GT_EQ_INFO = Isolate.$isolateProperties.CTC145;
$.STAR_TOKEN = 42;
$.$$A = 65;
$.PERCENT_EQ_TOKEN = 156;
$.$$CLOSE_PAREN = 41;
$.LINK_NAME = 'link_name';
$.MEMBERS = 'members';
$.Keyword_CASE = Isolate.$isolateProperties.CTC170;
$.EQ_TOKEN = 61;
$._JsonParser_CHAR_6 = 54;
$.Keyword_VAR = Isolate.$isolateProperties.CTC195;
$.ASSIGNMENT_PRECEDENCE = 1;
$.AMPERSAND_EQ_INFO = Isolate.$isolateProperties.CTC107;
$.$$d = 100;
$._JsonParser_CHAR_5 = 53;
$.currentLibrary = null;
$.$$2 = 50;
$.$$NBSP = 160;
$.MINUS_EQ_INFO = Isolate.$isolateProperties.CTC121;
$.OPEN_CURLY_BRACKET_TOKEN = 123;
$.GT_TOKEN = 62;
$.Keyword_CONTINUE = Isolate.$isolateProperties.CTC173;
$._getTypeNameOf = null;
$.Keyword_IN = Isolate.$isolateProperties.CTC182;
$.INDEX_EQ_TOKEN = 141;
$.OPEN_CURLY_BRACKET_INFO = Isolate.$isolateProperties.CTC48;
$.SETTER = 'setter';
$.$$PLUS = 43;
$.Keyword_BREAK = Isolate.$isolateProperties.CTC169;
$.Keyword_ABSTRACT = Isolate.$isolateProperties.CTC198;
$.KIND = 'kind';
$.AMPERSAND_INFO = Isolate.$isolateProperties.CTC109;
$.LT_INFO = Isolate.$isolateProperties.CTC163;
$.AMPERSAND_EQ_TOKEN = 146;
$.GT_GT_EQ_TOKEN = 139;
$.GT_GT_INFO = Isolate.$isolateProperties.CTC153;
$._JsonParser_CHAR_B = 98;
$.SLASH_EQ_INFO = Isolate.$isolateProperties.CTC72;
$.Keyword_SUPER = Isolate.$isolateProperties.CTC189;
$.CLASS = 'class';
$.Keyword_CLASS = Isolate.$isolateProperties.CTC200;
$.hideDropDownSuspend = false;
$.$$AT = 64;
$.BANG_TOKEN = 33;
$.Keyword_OPERATOR = Isolate.$isolateProperties.CTC87;
$.Keyword_IMPLEMENTS = Isolate.$isolateProperties.CTC205;
$.POSTFIX_PRECEDENCE = 14;
$.BAR_EQ_TOKEN = 148;
$.CLOSE_SQUARE_BRACKET_INFO = Isolate.$isolateProperties.CTC44;
$.Keyword_FINAL = Isolate.$isolateProperties.CTC178;
$.QUESTION_TOKEN = 63;
$.STRING_INTERPOLATION_IDENTIFIER_TOKEN = 162;
$.EQ_EQ_TOKEN = 135;
$.STRING_INTERPOLATION_IDENTIFIER_INFO = Isolate.$isolateProperties.CTC66;
$.$$OPEN_PAREN = 40;
$.GT_GT_GT_INFO = Isolate.$isolateProperties.CTC151;
$.$$8 = 56;
$.$$DQ = 34;
$._JsonParser_CARRIAGE_RETURN = 13;
$.FUNCTION_TOKEN = 130;
$.Keyword_GET = Isolate.$isolateProperties.CTC204;
$._JsonParser_CHAR_0 = 48;
$.$$X = 88;
$.$$EQ = 61;
$.DOUBLE_INFO = Isolate.$isolateProperties.CTC60;
$.Keyword_TRY = Isolate.$isolateProperties.CTC194;
$.ARGS = 'args';
$.EOF_INFO = Isolate.$isolateProperties.CTC28;
$._JsonParser_BACKSLASH = 92;
$.$$1 = 49;
$.STRING_TOKEN = 39;
$._JsonParser_CHAR_8 = 56;
$.$$MINUS = 45;
$.PERCENT_EQ_INFO = Isolate.$isolateProperties.CTC111;
$.currentResults = Isolate.$isolateProperties.CTC;
$.$$AMPERSAND = 38;
$.INTERFACE = 'interface';
$.Keyword_INTERFACE = Isolate.$isolateProperties.CTC207;
$.CARET_EQ_INFO = Isolate.$isolateProperties.CTC95;
$.Keyword_DEFAULT = Isolate.$isolateProperties.CTC174;
$._JsonParser_CHAR_R = 114;
$._JsonParser_SLASH = 47;
$._JsonParser_CHAR_9 = 57;
$.COMMENT_INFO = Isolate.$isolateProperties.CTC76;
$.CLOSE_PAREN_TOKEN = 41;
$.COMMA_TOKEN = 44;
$.Keyword_ELSE = Isolate.$isolateProperties.CTC176;
$.MINUS_INFO = Isolate.$isolateProperties.CTC123;
$.AMPERSAND_AMPERSAND_INFO = Isolate.$isolateProperties.CTC105;
$.$$k = 107;
$.AMPERSAND_TOKEN = 38;
$.Keyword_ASSERT = Isolate.$isolateProperties.CTC199;
$.CARET_EQ_TOKEN = 158;
$.$$QUESTION = 63;
$.BANG_INFO = Isolate.$isolateProperties.CTC135;
$._JsonParser_STRING_LITERAL = 34;
$.KeywordState__KEYWORD_STATE = null;
$.$$TILDE = 126;
$.$$5 = 53;
$.CLOSE_PAREN_INFO = Isolate.$isolateProperties.CTC34;
$.$$D = 68;
$._JsonParser_LBRACE = 123;
$.COLON_TOKEN = 58;
$.TILDE_SLASH_EQ_TOKEN = 154;
$.currentSearchText = null;
$.COMMENT_TOKEN = 161;
$.$$STAR = 42;
$.AT_TOKEN = 64;
$.LT_LT_TOKEN = 137;
$.$$BAR = 124;
$.dropdown = null;
$.BACKSLASH_TOKEN = 92;
$.INDEX_INFO = Isolate.$isolateProperties.CTC91;
$.OPEN_SQUARE_BRACKET_TOKEN = 91;
$.$$CR = 13;
$.PERIOD_INFO = Isolate.$isolateProperties.CTC58;
$.GT_GT_GT_EQ_INFO = Isolate.$isolateProperties.CTC149;
$.NAME = 'name';
$.OPEN_PAREN_INFO = Isolate.$isolateProperties.CTC32;
$.IS_TOKEN = 159;
$._JsonParser_NEW_LINE = 10;
$.TYPEDEF = 'typedef';
$.Keyword_TYPEDEF = Isolate.$isolateProperties.CTC214;
$.SEMICOLON_TOKEN = 59;
$.TILDE_SLASH_TOKEN = 155;
$.GT_GT_TOKEN = 157;
$.$$7 = 55;
$.HASH_TOKEN = 35;
$.$$CLOSE_CURLY_BRACKET = 125;
$.PERIOD_PERIOD_TOKEN = 133;
$.EOF_TOKEN = 0;
$.$$OPEN_SQUARE_BRACKET = 91;
$._JsonParser_WHITESPACE = 32;
$.PERIOD_PERIOD_PERIOD_INFO = Isolate.$isolateProperties.CTC54;
$.$$COLON = 58;
$.Keyword_RETURN = Isolate.$isolateProperties.CTC188;
$.Keyword_NEW = Isolate.$isolateProperties.CTC186;
$._cachedBrowserPrefix = null;
$._JsonParser_CHAR_4 = 52;
$.Primitives_DOLLAR_CHAR_VALUE = 36;
$.CLOSE_SQUARE_BRACKET_TOKEN = 93;
$._JsonParser_LAST_ASCII = 125;
$.BAR_BAR_TOKEN = 147;
$.$$LT = 60;
$._JsonParser_CHAR_T = 116;
$.$$OPEN_CURLY_BRACKET = 123;
$.$$GT = 62;
$.TILDE_TOKEN = 126;
$.$$SPACE = 32;
$.IDENTIFIER_INFO = Isolate.$isolateProperties.CTC165;
$.$$_ = 95;
$._JsonParser_NULL_STRING = 'null';
$.$$SQ = 39;
$._JsonParser_CHAR_F = 102;
$.Keyword_FACTORY = Isolate.$isolateProperties.CTC203;
$.GT_GT_GT_EQ_TOKEN = 140;
$.HEXADECIMAL_INFO = Isolate.$isolateProperties.CTC62;
$.SLASH_EQ_TOKEN = 131;
$.PLUS_TOKEN = 43;
$._JsonParser_COMMA = 44;
$._JsonParser_LBRACKET = 91;
$._JsonParser_RBRACE = 125;
$.CASCADE_PRECEDENCE = 2;
$.Keyword__keywords = null;
$.searchInput = null;
$.PLUS_PLUS_INFO = Isolate.$isolateProperties.CTC125;
$.PERCENT_TOKEN = 37;
$._JsonParser_PLUS = 43;
$.$$0 = 48;
$.KEYWORD_INFO = Isolate.$isolateProperties.CTC86;
$.LT_EQ_TOKEN = 129;
$.BAR_INFO = Isolate.$isolateProperties.CTC103;
$.GT_GT_EQ_INFO = Isolate.$isolateProperties.CTC147;
$.LT_LT_EQ_TOKEN = 136;
$.Keyword_CONST = Isolate.$isolateProperties.CTC172;
$.BAR_TOKEN = 124;
$.CARET_TOKEN = 94;
$.EQ_EQ_INFO = Isolate.$isolateProperties.CTC139;
$.BAR_EQ_INFO = Isolate.$isolateProperties.CTC101;
$.BACKPING_INFO = Isolate.$isolateProperties.CTC46;
$.currentType = null;
$.OPEN_PAREN_TOKEN = 40;
$.GT_EQ_TOKEN = 138;
$.PERIOD_PERIOD_INFO = Isolate.$isolateProperties.CTC56;
$.KeyName_F3 = 'F3';
$.Keyword_TRUE = Isolate.$isolateProperties.CTC193;
$.MINUS_TOKEN = 45;
$.$$EOF = 0;
$.Keyword_VOID = Isolate.$isolateProperties.CTC196;
$.BACKSLASH_INFO = Isolate.$isolateProperties.CTC30;
$.Keyword_SWITCH = Isolate.$isolateProperties.CTC190;
$.Keyword_STATIC = Isolate.$isolateProperties.CTC213;
$.TYPES = 'types';
$.$$z = 122;
$.Keyword_values = Isolate.$isolateProperties.CTC215;
$.GETTER = 'getter';
$.$$BACKPING = 96;
$.$$TAB = 9;
$._JsonParser_TRUE_STRING = 'true';
$._JsonParser_FORM_FEED = 12;
$.$$4 = 52;
$.$$f = 102;
$.AS_INFO = Isolate.$isolateProperties.CTC167;
$.LT_LT_INFO = Isolate.$isolateProperties.CTC161;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter =   function(field, prototype) {
    var len = field.length;
    var lastChar = field[len - 1];
    var needsGetter = lastChar == '?' || lastChar == '=';
    var needsSetter = lastChar == '!' || lastChar == '=';
    if (needsGetter || needsSetter) field = field.substring(0, len - 1);
    if (needsGetter) {
      var getterString = "return this." + field + ";";
        prototype["get$" + field] = new Function(getterString);
    }
    if (needsSetter) {
      var setterString = "this." + field + " = v;";
      prototype["set$" + field] = new Function("v", setterString);
    }
    return field;
  };
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};

(function(table) {
  for (var key in table) {
    $.defineProperty(Object.prototype, key, table[key]);
  }
})({
 is$JavaScriptIndexingBehavior: function() { return false; },
 is$ArrayBufferView: function() { return false; },
 is$_FileListImpl: function() { return false; },
 is$_ImageDataImpl: function() { return false; },
 is$_FileImpl: function() { return false; },
 is$_ArrayBufferViewImpl: function() { return false; },
 is$ArrayBuffer: function() { return false; },
 toString$0: function() { return $.toStringForNativeObject(this); },
 is$_BlobImpl: function() { return false; },
 is$Blob: function() { return false; },
 is$File: function() { return false; },
 is$Element: function() { return false; },
 is$Map: function() { return false; },
 is$_ArrayBufferImpl: function() { return false; },
 is$Location: function() { return false; },
 is$List: function() { return false; },
 is$FileList: function() { return false; },
 is$Collection: function() { return false; },
 is$ImageData: function() { return false; }
});

$.$defineNativeClass('AbstractWorker', [], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._AbstractWorkerEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLAnchorElement', ["href!", "name?", "type?"], {
 toString$0: function() {
  return this.toString();
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitAnimation', ["name?"], {
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAreaElement', ["href!"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ArrayBuffer', [], {
 is$_ArrayBufferImpl: function() { return true; },
 is$ArrayBuffer: function() { return true; }
});

$.$defineNativeClass('ArrayBufferView', [], {
 is$_ArrayBufferViewImpl: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Attr', ["name?", "value="], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLAudioElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('AudioParam', ["name?", "value="], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.call$0(); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseElement', ["href!"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('BatteryManager', [], {
 get$on: function() {
  return $._BatteryManagerEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('BeforeLoadEvent', ["url?"], {
});

$.$defineNativeClass('BiquadFilterNode', ["type?"], {
});

$.$defineNativeClass('Blob', ["type?"], {
 is$_BlobImpl: function() { return true; },
 is$Blob: function() { return true; }
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', ["name?", "type?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('CSSFontFaceRule', ["style?"], {
});

$.$defineNativeClass('WebKitCSSKeyframeRule', ["style?"], {
});

$.$defineNativeClass('WebKitCSSKeyframesRule', ["name?"], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('CSSPageRule', ["style?"], {
});

$.$defineNativeClass('CSSRule', ["type?"], {
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
},
 setProperty$3: function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
},
 get$clear: function() {
  return this.getPropertyValue$1('clear');
},
 clear$0: function() { return this.get$clear().call$0(); },
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
},
 filter$1: function(arg0) { return this.get$filter().call$1(arg0); },
 set$visibility: function(value) {
  this.setProperty$3('visibility', value, '');
}
});

$.$defineNativeClass('CSSStyleRule', ["style?"], {
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
_ConsoleImpl.info$1 = function(arg) {
  return this.info(arg);
};
_ConsoleImpl.get$info = function() { return new $.BoundClosure0(this, 'info$1'); };
$.$defineNativeClass('HTMLContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DOMApplicationCache', ["status?"], {
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('DOMError', ["name?"], {
});

$.$defineNativeClass('DOMException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('DOMFileSystem', ["name?"], {
});

$.$defineNativeClass('DOMFileSystemSync', ["name?"], {
});

$.$defineNativeClass('DOMMimeType', ["type?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["length?", "name?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', ["type?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'String');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC19);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 contains$1: function(string) {
  return this.contains(string);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 add$1: function(token) {
  return this.add(token);
},
 contains$1: function(token) {
  return this.contains(token);
},
 remove$1: function(token) {
  return this.remove(token);
},
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('HTMLDataListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DataTransferItem', ["kind?", "type?"], {
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
},
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
},
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('DataView', [], {
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 open$3: function(arg0, arg1, arg2) { return this.open.call$3(arg0, arg1, arg2); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDirectoryElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDivElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDocument', ["head?", "readyState?"], {
 get$on: function() {
  return $._DocumentEventsImpl$(this);
},
 $dom_createElement$1: function(tagName) {
  return this.createElement(tagName);
},
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
},
 $dom_getElementsByName$1: function(elementName) {
  return this.getElementsByName(elementName);
},
 $dom_getElementsByTagName$1: function(tagname) {
  return this.getElementsByTagName(tagname);
},
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
},
 $dom_querySelectorAll$1: function(selectors) {
  return this.querySelectorAll(selectors);
},
 query$1: function(selectors) {
  if ($.CTC24.hasMatch$1(selectors) === true)
    return this.$dom_getElementById$1($.substring$1(selectors, 1));
  return this.$dom_querySelector$1(selectors);
},
 queryAll$1: function(selectors) {
  if ($.CTC25.hasMatch$1(selectors) === true) {
    var mutableMatches = this.$dom_getElementsByName$1($.substring$2(selectors, 7, selectors.length - 2));
    if (typeof mutableMatches !== 'string' && (typeof mutableMatches !== 'object' || mutableMatches === null || mutableMatches.constructor !== Array && !mutableMatches.is$JavaScriptIndexingBehavior()))
      return this.queryAll$1$bailout(1, mutableMatches);
    var len = mutableMatches.length;
    var copyOfMatches = $.ListImplementation_List(len, 'Element');
    for (var i = 0; i < len; ++i) {
      if (i < 0 || i >= mutableMatches.length)
        throw $.ioore(i);
      var t1 = mutableMatches[i];
      if (i < 0 || i >= copyOfMatches.length)
        throw $.ioore(i);
      copyOfMatches[i] = t1;
    }
    return $._FrozenElementList$_wrap(copyOfMatches);
  } else if ($.CTC26.hasMatch$1(selectors) === true) {
    mutableMatches = this.$dom_getElementsByTagName$1(selectors);
    if (typeof mutableMatches !== 'string' && (typeof mutableMatches !== 'object' || mutableMatches === null || mutableMatches.constructor !== Array && !mutableMatches.is$JavaScriptIndexingBehavior()))
      return this.queryAll$1$bailout(2, mutableMatches);
    len = mutableMatches.length;
    copyOfMatches = $.ListImplementation_List(len, 'Element');
    for (i = 0; i < len; ++i) {
      if (i < 0 || i >= mutableMatches.length)
        throw $.ioore(i);
      t1 = mutableMatches[i];
      if (i < 0 || i >= copyOfMatches.length)
        throw $.ioore(i);
      copyOfMatches[i] = t1;
    }
    return $._FrozenElementList$_wrap(copyOfMatches);
  } else
    return $._FrozenElementList$_wrap(this.$dom_querySelectorAll$1(selectors));
},
 queryAll$1$bailout: function(state, env0) {
  switch (state) {
    case 1:
      mutableMatches = env0;
      break;
    case 2:
      mutableMatches = env0;
      break;
  }
  switch (state) {
    case 0:
    default:
      if (state === 1 || state === 0 && $.CTC25.hasMatch$1(selectors) === true)
        switch (state) {
          case 0:
            var mutableMatches = this.$dom_getElementsByName$1($.substring$2(selectors, 7, selectors.length - 2));
          case 1:
            state = 0;
            var len = $.get$length(mutableMatches);
            var copyOfMatches = $.ListImplementation_List(len, 'Element');
            for (var i = 0; $.ltB(i, len); ++i) {
              var t1 = $.index(mutableMatches, i);
              if (i < 0 || i >= copyOfMatches.length)
                throw $.ioore(i);
              copyOfMatches[i] = t1;
            }
            return $._FrozenElementList$_wrap(copyOfMatches);
        }
      else
        switch (state) {
          case 0:
          case 2:
            if (state === 2 || state === 0 && $.CTC26.hasMatch$1(selectors) === true)
              switch (state) {
                case 0:
                  mutableMatches = this.$dom_getElementsByTagName$1(selectors);
                case 2:
                  state = 0;
                  len = $.get$length(mutableMatches);
                  copyOfMatches = $.ListImplementation_List(len, 'Element');
                  for (i = 0; $.ltB(i, len); ++i) {
                    t1 = $.index(mutableMatches, i);
                    if (i < 0 || i >= copyOfMatches.length)
                      throw $.ioore(i);
                    copyOfMatches[i] = t1;
                  }
                  return $._FrozenElementList$_wrap(copyOfMatches);
              }
            else
              return $._FrozenElementList$_wrap(this.$dom_querySelectorAll$1(selectors));
        }
  }
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 get$elements: function() {
  if (this._elements == null)
    this._elements = $.FilteredElementList$(this);
  return this._elements;
},
 set$elements: function(value) {
  var copy = $.ListImplementation_List$from(value);
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, copy);
},
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
},
 queryAll$1: function(selectors) {
  return $._FrozenElementList$_wrap(this.$dom_querySelectorAll$1(selectors));
},
 set$innerHTML: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$innerHTML')) {
  {
  $.clear(this.get$nodes());
  var e = $._ElementFactoryProvider_Element$tag('div');
  e.set$innerHTML(value);
  var nodes = $.ListImplementation_List$from(e.get$nodes());
  $.addAll(this.get$nodes(), nodes);
}
  } else {
    return Object.prototype.set$innerHTML.call(this, value);
  }

},
 get$$$dom_firstElementChild: function() {
  return this.get$elements().first$0();
},
 get$$$dom_lastElementChild: function() {
  return $.last(this.get$elements());
},
 get$parent: function() {
  return;
},
 get$attributes: function() {
  return $.CTC22;
},
 get$classes: function() {
  return $._FrozenCSSClassSet$();
},
 get$dataAttributes: function() {
  return $.CTC22;
},
 get$style: function() {
  return $._ElementFactoryProvider_Element$tag('div').get$style();
},
 blur$0: function() {
},
 get$blur: function() { return new $.BoundClosure(this, 'blur$0'); },
 focus$0: function() {
},
 get$focus: function() { return new $.BoundClosure(this, 'focus$0'); },
 click$0: function() {
},
 get$click: function() { return new $.BoundClosure(this, 'click$0'); },
 get$on: function() {
  return $._ElementEventsImpl$(this);
},
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
},
 $dom_querySelectorAll$1: function(selectors) {
  return this.querySelectorAll(selectors);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentType', ["name?"], {
});

$.$defineNativeClass('Element', ["innerHTML!", "style?"], {
 get$attributes: function() {
  return $._ElementAttributeMap$(this);
},
 set$elements: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$elements')) {
  {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
}
  } else {
    return Object.prototype.set$elements.call(this, value);
  }

},
 get$elements: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$elements')) {
  {
  return $._ChildrenElementList$_wrap(this);
}
  } else {
    return Object.prototype.get$elements.call(this);
  }

},
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
},
 queryAll$1: function(selectors) {
  return $._FrozenElementList$_wrap(this.$dom_querySelectorAll$1(selectors));
},
 get$classes: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$classes')) {
  {
  return $._CssClassSet$(this);
}
  } else {
    return Object.prototype.get$classes.call(this);
  }

},
 get$dataAttributes: function() {
  return $._DataAttributeMap$(this.get$attributes());
},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._ElementEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 get$$$dom_children: function() {
return this.children;
},
 click$0: function() {
  return this.click();
},
 get$click: function() { return new $.BoundClosure(this, 'click$0'); },
 get$$$dom_className: function() {
return this.className;
},
 set$$$dom_className: function(value) {
this.className = value;
},
 get$$$dom_firstElementChild: function() {
return this.firstElementChild;
},
 get$$$dom_lastElementChild: function() {
return this.lastElementChild;
},
 blur$0: function() {
  return this.blur();
},
 get$blur: function() { return new $.BoundClosure(this, 'blur$0'); },
 focus$0: function() {
  return this.focus();
},
 get$focus: function() { return new $.BoundClosure(this, 'focus$0'); },
 $dom_getAttribute$1: function(name) {
  return this.getAttribute(name);
},
 $dom_hasAttribute$1: function(name) {
  return this.hasAttribute(name);
},
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
},
 $dom_querySelectorAll$1: function(selectors) {
  return this.querySelectorAll(selectors);
},
 $dom_removeAttribute$1: function(name) {
  return this.removeAttribute(name);
},
 $dom_setAttribute$2: function(name, value) {
  return this.setAttribute(name,value);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLEmbedElement', ["name?", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Entry', ["name?"], {
 remove$2: function(successCallback, errorCallback) {
  return this.remove($.convertDartClosureToJS(successCallback, 0),$.convertDartClosureToJS(errorCallback, 1));
},
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  return this.remove(successCallback);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', ["name?"], {
 remove$0: function() {
  return this.remove();
}
});

$.$defineNativeClass('Event', ["type?"], {
 preventDefault$0: function() {
  return this.preventDefault();
}
});

$.$defineNativeClass('EventException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('EventSource', ["readyState?", "url?"], {
 get$on: function() {
  return $._EventSourceEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('EventTarget', [], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._EventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

}
});

$.$defineNativeClass('HTMLFieldSetElement', ["elements?", "name?", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('File', ["name?"], {
 is$_FileImpl: function() { return true; },
 is$File: function() { return true; },
 is$Blob: function() { return true; }
});

$.$defineNativeClass('FileException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('FileList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'File');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC19);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$_FileListImpl: function() { return true; },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$FileList: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', ["readyState?"], {
 get$on: function() {
  return $._FileReaderEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('FileWriter', ["length?", "readyState?"], {
 get$on: function() {
  return $._FileWriterEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'num');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC19);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'num');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC19);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?", "name?"], {
 reset$0: function() {
  return this.reset();
},
 get$reset: function() { return new $.BoundClosure(this, 'reset$0'); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', ["location?", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', ["rows?"], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('GamepadList', ["length?"], {
});

$.$defineNativeClass('HTMLHRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'Node');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC19);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 get$length: function() {
return this.length;
},
 set$length: function(value) {
this.length = value;
},
 remove$1: function(index) {
  return this.remove(index);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLHeadElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHeadingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('HTMLHtmlElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('XMLHttpRequest', ["readyState?", "responseText?", "status?", "withCredentials!"], {
 get$on: function() {
  return $._HttpRequestEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 open$5: function(method, url, async, user, password) {
  return this.open(method,url,async,user,password);
},
 open$3: function(method,url,async) {
  return this.open(method,url,async);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 send$1: function(data) {
  return this.send(data);
},
 send$0: function() {
  return this.send();
}
});

$.$defineNativeClass('XMLHttpRequestException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 get$on: function() {
  return $._HttpRequestUploadEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBCursor', [], {
 get$key: function() {
  return $._convertNativeToDart_IDBKey(this.get$_key());
},
 get$_key: function() {
return this.key;
}
});

$.$defineNativeClass('IDBCursorWithValue', [], {
 get$value: function() {
  return $._convertNativeToDart_AcceptStructuredClone(this.get$_lib_value());
},
 get$_lib_value: function() {
return this.value;
}
});

$.$defineNativeClass('IDBDatabase', ["name?"], {
 get$on: function() {
  return $._IDBDatabaseEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBDatabaseException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('IDBIndex', ["name?"], {
});

$.$defineNativeClass('IDBObjectStore', ["name?"], {
 add$2: function(value, key) {
  if (!$.eqB($.CTC2, key))
    return this._add_1$2($._convertDartToNative_SerializedScriptValue(value), key);
  return this._add_2$1($._convertDartToNative_SerializedScriptValue(value));
},
 add$1: function(value) {
  return this.add$2(value,Isolate.$isolateProperties.CTC2)
},
 _add_1$2: function(value, key) {
  return this.add(value,key);
},
 _add_2$1: function(value) {
  return this.add(value);
},
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBRequest', ["readyState?"], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._IDBRequestEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

}
});

$.$defineNativeClass('IDBTransaction', [], {
 get$on: function() {
  return $._IDBTransactionEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLIFrameElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ImageData', [], {
 is$_ImageDataImpl: function() { return true; },
 is$ImageData: function() { return true; }
});

$.$defineNativeClass('HTMLImageElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["name?", "type?", "value="], {
 get$on: function() {
  return $._InputElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC19);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC19);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC19);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('JavaScriptCallFrame', ["type?"], {
});

$.$defineNativeClass('KeyboardEvent', ["ctrlKey?", "keyIdentifier?"], {
});

$.$defineNativeClass('HTMLKeygenElement', ["name?", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', ["type?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLabelElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLegendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLinkElement', ["href!", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('Location', ["href!"], {
 toString$0: function() {
  return this.toString();
},
 is$Location: function() { return true; }
});

$.$defineNativeClass('HTMLMapElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMarqueeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaController', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLMediaElement', ["readyState?"], {
 get$on: function() {
  return $._MediaElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'String');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC19);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaSource', ["readyState?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('MediaStream', ["readyState?"], {
 get$on: function() {
  return $._MediaStreamEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

}
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrack', ["kind?", "readyState?"], {
 get$on: function() {
  return $._MediaStreamTrackEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 get$on: function() {
  return $._MediaStreamTrackListEventsImpl$(this);
},
 add$1: function(track) {
  return this.add(track);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 remove$1: function(track) {
  return this.remove(track);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLMenuElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MessagePort', [], {
 get$on: function() {
  return $._MessagePortEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLMetaElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLModElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MouseEvent', ["ctrlKey?"], {
});

$.$defineNativeClass('MutationRecord', ["type?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'Node');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC19);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 get$nodes: function() {
  return $._ChildNodeListLazy$(this);
},
 remove$0: function() {
  if (!(this.get$parent() == null))
    this.get$parent().$dom_removeChild$1(this);
  return this;
},
 replaceWith$1: function(otherNode) {
  try {
    var parent$ = this.get$parent();
    parent$.$dom_replaceChild$2(otherNode, this);
  } catch (exception) {
    $.unwrapException(exception);
  }

  return this;
},
 get$$$dom_attributes: function() {
return this.attributes;
},
 get$$$dom_childNodes: function() {
return this.childNodes;
},
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
  {
return this.parentNode;
}
  } else {
    return Object.prototype.get$parent.call(this);
  }

},
 get$text: function() {
return this.textContent;
},
 set$text: function(value) {
this.textContent = value;
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
},
 contains$1: function(other) {
  return this.contains(other);
},
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
}
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'Node');
},
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._parent; t1.hasNext$0() === true;)
    t2.$dom_appendChild$1(t1.next$0());
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._parent.$dom_removeChild$1(result);
  return result;
},
 clear$0: function() {
  this._parent.set$text('');
},
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 get$first: function() {
  return this.operator$index$1(0);
},
 first$0: function() { return this.get$first().call$0(); },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', [], {
 get$on: function() {
  return $._NotificationEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLOListElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', ["name?", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptGroupElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Oscillator', ["type?"], {
});

$.$defineNativeClass('HTMLOutputElement', ["name?", "type?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParagraphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParamElement', ["name?", "type?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('PeerConnection00', ["readyState?"], {
 get$on: function() {
  return $._PeerConnection00EventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('PerformanceNavigation', ["type?"], {
});

$.$defineNativeClass('HTMLPreElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLQuoteElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('RTCPeerConnection', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('RangeException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('SQLResultSet', ["rows?"], {
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphDefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphItemElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGAnimateColorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateMotionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateTransformElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimationElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCircleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGClipPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCursorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDefsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDescElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDocument', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElement', [], {
 get$classes: function() {
  if (this.get$_cssClassSet() == null)
    this.set$_cssClassSet($._AttributeClassSet$(this.get$_ptr()));
  return this.get$_cssClassSet();
},
 get$elements: function() {
  return $.FilteredElementList$(this);
},
 set$elements: function(value) {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
},
 set$innerHTML: function(svg) {
  var container = $._ElementFactoryProvider_Element$tag('div');
  container.set$innerHTML('<svg version="1.1">' + $.S(svg) + '</svg>');
  this.set$elements(container.get$elements().get$first().get$elements());
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$(this);
}
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGEllipseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('SVGFEBlendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEComponentTransferElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFECompositeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDisplacementMapElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDistantLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDropShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFloodElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncBElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEGaussianBlurElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeNodeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMorphologyElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEOffsetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEPointLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpecularLightingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpotLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETileElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETurbulenceElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFilterElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceFormatElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceNameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceSrcElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceUriElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGForeignObjectElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGHKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGLineElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLinearGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMarkerElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMaskElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMetadataElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMissingGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPatternElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPolygonElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPolylineElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRadialGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRectElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSVGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGScriptElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStopElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGStyleElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSwitchElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSymbolElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPositioningElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTransform', ["type?"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGUseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGVKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLScriptElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ScriptProfile', ["head?"], {
});

$.$defineNativeClass('ScriptProfileNode', ["url?"], {
});

$.$defineNativeClass('HTMLSelectElement', ["length=", "name?", "type?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ShadowRoot', ["innerHTML!"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SharedWorkerContext', ["name?"], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$(this);
}
});

$.$defineNativeClass('SourceBufferList', ["length?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLSourceElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 containsKey$1: function(key) {
  return !(this.$dom_getItem$1(key) == null);
},
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
},
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
},
 remove$1: function(key) {
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
},
 clear$0: function() {
  return this.$dom_clear$0();
},
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null)
      return;
    f.call$2(key, this.operator$index$1(key));
  }
},
 get$length: function() {
  return this.get$$$dom_length();
},
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
},
 get$$$dom_length: function() {
return this.length;
},
 $dom_clear$0: function() {
  return this.clear();
},
 $dom_getItem$1: function(key) {
  return this.getItem(key);
},
 $dom_key$1: function(index) {
  return this.key(index);
},
 $dom_removeItem$1: function(key) {
  return this.removeItem(key);
},
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
},
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?", "url?"], {
});

$.$defineNativeClass('HTMLStyleElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('StyleMedia', ["type?"], {
});

$.$defineNativeClass('StyleSheet', ["type?"], {
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'StyleSheet');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC19);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCaptionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableColElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableElement', ["rows?"], {
 insertRow$1: function(index) {
  return this.insertRow(index);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableRowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableSectionElement', ["rows?"], {
 insertRow$1: function(index) {
  return this.insertRow(index);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["name?", "rows?", "type?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TextTrack', ["kind?"], {
 get$on: function() {
  return $._TextTrackEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('TextTrackCue', ["text="], {
 get$on: function() {
  return $._TextTrackCueEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 get$on: function() {
  return $._TextTrackListEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('HTMLTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TouchEvent', ["ctrlKey?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'Touch');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC19);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', ["kind?", "readyState?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TreeWalker', [], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); }
});

$.$defineNativeClass('UIEvent', ["keyCode?"], {
});

$.$defineNativeClass('HTMLUListElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC19);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC19);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC19);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebGLActiveInfo', ["name?", "type?"], {
});

$.$defineNativeClass('WebKitNamedFlow', ["name?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('WebSocket', ["readyState?", "url?"], {
 get$on: function() {
  return $._WebSocketEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('DOMWindow', ["length?", "name?", "navigator?", "status?"], {
 _open3$3: function(url, name, options) {
return this.open(url, name, options);
},
 open$3: function(url, name$, options) {
  return $._DOMWindowCrossFrameImpl__createSafe(this._open3$3(url, name$, options));
},
 get$location: function() {
  return this._get_location$0();
},
 _get_location$0: function() {
  var result = this.get$_location();
  if ($._WindowImpl__isDartLocation(result) === true)
    return result;
  if (null == this._location_wrapper)
    this._location_wrapper = $._LocationWrapper$(result);
  return this._location_wrapper;
},
 get$_location: function() {
return this.location
},
 get$on: function() {
  return $._WindowEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 blur$0: function() {
  return this.blur();
},
 get$blur: function() { return new $.BoundClosure(this, 'blur$0'); },
 focus$0: function() {
  return this.focus();
},
 get$focus: function() { return new $.BoundClosure(this, 'focus$0'); },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('Worker', [], {
 get$on: function() {
  return $._WorkerEventsImpl$(this);
}
});

$.$defineNativeClass('WorkerContext', ["location?", "navigator?"], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._WorkerContextEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XPathException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('XPathResult', ["stringValue?"], {
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return this.reset();
},
 get$reset: function() { return new $.BoundClosure(this, 'reset$0'); }
});

// 322 dynamic classes.
// 375 classes
// 35 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_Uint8ArrayImpl)*/ = 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray';
  var v2/*class(_MouseEventImpl)*/ = 'MouseEvent|WheelEvent|WheelEvent';
  var v3/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement|SVGTextPathElement'].join('|');
  var v4/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v5/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v6/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v7/*class(_SVGElementImpl)*/ = [v3/*class(_SVGTextContentElementImpl)*/,v4/*class(_SVGGradientElementImpl)*/,v5/*class(_SVGComponentTransferFunctionElementImpl)*/,v6/*class(_SVGAnimationElementImpl)*/,v3/*class(_SVGTextContentElementImpl)*/,v4/*class(_SVGGradientElementImpl)*/,v5/*class(_SVGComponentTransferFunctionElementImpl)*/,v6/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v8/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v9/*class(_UIEventImpl)*/ = [v2/*class(_MouseEventImpl)*/,v2/*class(_MouseEventImpl)*/,'UIEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent'].join('|');
  var v10/*class(_ElementImpl)*/ = [v7/*class(_SVGElementImpl)*/,v8/*class(_MediaElementImpl)*/,v7/*class(_SVGElementImpl)*/,v8/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v11/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v12/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v13/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v14/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v15/*class(_NodeImpl)*/ = [v10/*class(_ElementImpl)*/,v11/*class(_DocumentFragmentImpl)*/,v12/*class(_DocumentImpl)*/,v13/*class(_CharacterDataImpl)*/,v10/*class(_ElementImpl)*/,v11/*class(_DocumentFragmentImpl)*/,v12/*class(_DocumentImpl)*/,v13/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v16/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v17/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest';
  var v18/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGGradientElement', v4/*class(_SVGGradientElementImpl)*/],
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v3/*class(_SVGTextContentElementImpl)*/],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet|CSSStyleSheet'],
    ['AbstractWorker', v18/*class(_AbstractWorkerImpl)*/],
    ['Uint8Array', v1/*class(_Uint8ArrayImpl)*/],
    ['ArrayBufferView', [v1/*class(_Uint8ArrayImpl)*/,v1/*class(_Uint8ArrayImpl)*/,'ArrayBufferView|Uint32Array|Uint16Array|Int8Array|Int32Array|Int16Array|Float64Array|Float32Array|DataView|Uint32Array|Uint16Array|Int8Array|Int32Array|Int16Array|Float64Array|Float32Array|DataView'].join('|')],
    ['MouseEvent', v2/*class(_MouseEventImpl)*/],
    ['UIEvent', v9/*class(_UIEventImpl)*/],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['Blob', 'Blob|File|File'],
    ['CSSRule', 'CSSRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['WorkerContext', v14/*class(_WorkerContextImpl)*/],
    ['CharacterData', v13/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v12/*class(_DocumentImpl)*/],
    ['DocumentFragment', v11/*class(_DocumentFragmentImpl)*/],
    ['SVGComponentTransferFunctionElement', v5/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v6/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v7/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v8/*class(_MediaElementImpl)*/],
    ['Element', v10/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Event', [v9/*class(_UIEventImpl)*/,v9/*class(_UIEventImpl)*/,'Event|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|IDBUpgradeNeededEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|IDBUpgradeNeededEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['Node', v15/*class(_NodeImpl)*/],
    ['MediaStream', v16/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v17/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v14/*class(_WorkerContextImpl)*/,v15/*class(_NodeImpl)*/,v16/*class(_MediaStreamImpl)*/,v17/*class(_IDBRequestImpl)*/,v18/*class(_AbstractWorkerImpl)*/,v14/*class(_WorkerContextImpl)*/,v15/*class(_NodeImpl)*/,v16/*class(_MediaStreamImpl)*/,v17/*class(_IDBRequestImpl)*/,v18/*class(_AbstractWorkerImpl)*/,'EventTarget|DOMWindow|WebSocket|WebKitNamedFlow|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|SVGElementInstance|RTCPeerConnection|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaSource|MediaController|IDBTransaction|IDBDatabase|XMLHttpRequestUpload|XMLHttpRequest|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext|DOMWindow|WebSocket|WebKitNamedFlow|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|SVGElementInstance|RTCPeerConnection|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaSource|MediaController|IDBTransaction|IDBDatabase|XMLHttpRequestUpload|XMLHttpRequest|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.main();
    }
  }, false);
} else {
  $.main();
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, fields, prototype) {
  var generateGetterSetter =   function(field, prototype) {
    var len = field.length;
    var lastChar = field[len - 1];
    var needsGetter = lastChar == '?' || lastChar == '=';
    var needsSetter = lastChar == '!' || lastChar == '=';
    if (needsGetter || needsSetter) field = field.substring(0, len - 1);
    if (needsGetter) {
      var getterString = "return this." + field + ";";
        prototype["get$" + field] = new Function(getterString);
    }
    if (needsSetter) {
      var setterString = "this." + field + " = v;";
      prototype["set$" + field] = new Function("v", setterString);
    }
    return field;
  };
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  constructor.prototype = prototype;
  return constructor;
};
var supportsProto = false;
var tmp = Isolate.$defineClass('c', ['f?'], {}).prototype;
if (tmp.__proto__) {
  tmp.__proto__ = {};
  if (typeof tmp.get$f !== "undefined") supportsProto = true;
}
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var cls in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, cls)) {
      var desc = collectedClasses[cls];
      Isolate.$isolateProperties[cls] = Isolate.$defineClass(cls, desc[''], desc);
      if (desc['super'] !== "") Isolate.$pendingClasses[cls] = desc['super'];
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (supportsProto) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
