Selection = {
  current: {},
  groups: {},
  
  clear: function() {
    Selection.groups = {};
    $.each($keys(Selection.current), function(){ Selection.deselect(this); });
    Facebar.populate(This.agents);
    Map.layer_refresh_icons('agents');
  },
  
  agent_ids: function() {
    var foo = $keys(Selection.current);
    if (isEmpty(Selection.groups)) return foo;
    $.each(This.agents, function(){
      if (Selection.groups[this.fab_state]) foo.push(this.id);
    });
    return foo.uniq();
  },
  
  is_item_selected: function(id){
    if (Selection.current[id]) return true;
    if (isEmpty(Selection.groups)) return false;
    if (Selection.groups[id.resource().fab_state]) return true;
    return false;
  },
  
  is_group_selected: function(group) {
    return Selection.groups[group];
  },
  
  toggle_group: function(group) {
    if (Selection.groups[group]) delete Selection.groups[group];
    else Selection.groups[group] = true;
    $.each($keys(Selection.current), function(){ 
      if (this.resource().fab_state == group) delete Selection.current[this];
    });
    Map.layer_refresh_icons('agents');
  },
  
  count_in_group: function(group_name) {
    if (Selection.groups[group_name]) return 'All';
    var count = 0;
    $.each($keys(Selection.current), function(){ 
      if (this.resource().fab_state == group_name) count++;
    });
    return count;
  },
  
  select: function(tag) {
    Selection.current[tag] = true;
    Selection.update(tag);
  },
  
  deselect: function(tag) {
    var fab_state = tag.resource().fab_state;
    if (Selection.groups[fab_state]) {
      // convert to individual selections
      Selection.groups[fab_state] = false;
      $.each(This.agents, function(){
        if (this.fab_state == fab_state) Selection.select(this.id);
      });
    }
    delete Selection.current[tag];
    Selection.update(tag);
  },
  
  toggle: function(tag) {
    if (Selection.is_item_selected(tag)) Selection.deselect(tag);
    else Selection.select(tag);
  },
    
  update: function(tag) {
    if (Selection.current[tag]) $('.athumb.' + tag).addClass('selected');
    else $('.athumb.' + tag).removeClass('selected');

    var guy = tag.resource();
    if (!guy) return;
    Item.calculate_fields(guy);
    Map.site_set_image('agents', tag, MapIcons.for_type(guy.map_icon).image);

    Selection.hide_or_show_options();
  },
  
  hide_or_show_options: function() {
    if (isEmpty(Selection.current) && isEmpty(Selection.groups)){
      $('#group_actions').hide();
      $('.require_selection').show();
    } else {
      $('#group_actions').show().center();
      $('.require_selection').hide();
    }
  }
  
};


LiveHTML.widgets.push({
    
  clear_selection: function(state) {
    Selection.clear();
  },
  
  no_selection: function(state) {
    return isEmpty(Selection.current) && isEmpty(Selection.groups);
  },

  has_selection: function(state) {
    return !isEmpty(Selection.current) || !isEmpty(Selection.groups);
  },

  require_selection_str: function() {
    return "Please select (option- or command-click) some agents";
  }

});
