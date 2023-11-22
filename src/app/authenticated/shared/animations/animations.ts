import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const expandOrCollapse = trigger('expandOrCollapse', [
  state(
    'void',
    style({
      height: '0px',
      opacity: '0',
      overflow: 'hidden',
    })
  ),
  transition('void <=> *', animate(300)),
]);

export const expandOrCollapseVertically = trigger(
  'expandOrCollapseVertically',
  [
    state(
      'void',
      style({
        height: '0px',
        overflow: 'hidden',
        transform: 'scaleX(0)',
      })
    ),
    transition('void <=> *', animate(300)),
  ]
);

export const showHideWithOpacity = trigger('showHideWithOpacity', [
  state(
    'void',
    style({
      opacity: 0,
    })
  ),
  transition('void <=> *', animate(300)),
]);

export const expandOrCollapseOnCondition = trigger(
  'expandOrCollapseOnCondition',
  [
    state(
      'collapsed',
      style({
        height: '0px',
        overflow: 'hidden',
        transform: 'scaleX(0)',
      })
    ),
    state(
      'expanded',
      style({
        height: 'fit-content',
        overflow: 'hidden',
      })
    ),
    transition('collapsed <=> expanded', animate(300)),
  ]
);

export const animations = [
  expandOrCollapse,
  expandOrCollapseOnCondition,
  expandOrCollapseVertically,
  showHideWithOpacity,
];
