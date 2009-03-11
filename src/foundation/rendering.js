function tag(name, attrs) {
  var content = '';
  if (attrs.length) attrs = {content: attrs};
  if (name.contains('.')) {
    var words = name.split('.');
    name = words[0];
    attrs['class'] = words.slice(1).join(' ');
  }
  if (name == 'a' && !attrs.href) attrs.href = '#';
  if (attrs.content) {
    content = attrs.content;
    delete attrs.content;
  }
  if (attrs.cls) {
    attrs['class'] = attrs.cls;
    delete attrs.cls;
  }
  var attr = $pairs(attrs).map(function(x){ return x.key + "=\"" + x.val + "\""; }).join(' ');
  return "<" + name + " " + attr + ">" + content + "</" + name + ">";
}

function number_word(n) {
  if (n > 15) return n;
  return [
    'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen'
  ][n];
}

function pluralize_with_number_word(n, singular, plural) {
  if (!plural) plural = singular + "s";
  if (n == 1) return "One " + singular;
  return number_word(n) + " " + plural;
}

function pluralize(n, singular, plural) {
  if (!plural) plural = singular + "s";
  if (n == 1) return n + " " + singular;
  return n + " " + plural;
}

function english_list(items) {
  if (items.length == 1) return items[0];
  if (items.length == 2) return items[0] + " and " + items[1];
  var last = items.pop();
  return items.join(', ') + " and " + last;
}
