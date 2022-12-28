const { UIContent } = require('@/helpers/UIContent')

export function CrossHair() {
  return (
    <>
      {' '}
      <UIContent>
        <div
          style={{
            position: 'fixed',
            top: 'calc(50% - 1px / 2)',
            left: 'calc(50% - 25px / 2)',
            height: '1px',
            width: `25px`,
            backdropFilter: 'invert(1)',
            background: 'transparent',
          }}
        ></div>
        <div
          style={{
            position: 'fixed',
            top: 'calc(50% - 25px / 2)',
            left: 'calc(50% - 1px / 2)',
            width: '1px',
            height: `25px`,
            backdropFilter: 'invert(1)',
            background: 'transparent',
          }}
        ></div>
      </UIContent>
    </>
  )
}
