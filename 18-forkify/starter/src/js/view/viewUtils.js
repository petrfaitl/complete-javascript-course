import icons from 'url:../../img/icons.svg';
// Loading Spinner
export const renderSpinner = function(parentEl) {
  const markup = `
    <div class='spinner'>
        <svg>
          <use href='${icons}#icon-loader'></use>
        </svg>
      </div>
  `;
  // parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};