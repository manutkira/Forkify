import view from './view.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class ResultsView extends view {
  parentElement = document.querySelector('.results');
  errorMessage = 'No recipe found!🥶🥶🥶';
  message = '';

  generateMarkup() {
    return this.data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
