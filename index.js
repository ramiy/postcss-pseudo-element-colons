const postcss = require( 'postcss' );

module.exports = postcss.plugin( 'postcss-pseudo-elements', ( options ) => {

  options = options || {};

  const
    selectors = options.selectors || [
      'before',
      'after',
      'cue',
      'cue-region',
      'first-letter',
      'first-line',
      'file-selector-button',
      'selection'
    ],
    notationOption = options['colon-notation'] || 'double',
    notation = notationOption === 'double' ? '::' : ':',
    replacements = new RegExp( '(?:|:):(' + selectors.join('|') + ')', 'gi' );

  return ( css ) => {
    css.walkRules( ( rule ) => {
      rule.selector = rule.selector.replace( replacements, notation + '$1' );
    });
  }
});
