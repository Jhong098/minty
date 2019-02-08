import { ICONS, ICON_COLORS } from '../assets/icons';

function searchForCategory(input, category) {
  return input.toLowerCase().includes(category);
}

export function getIconByCategory(category) {
  return ICONS[category];
}

export function getColorByCategory(category) {
  return ICON_COLORS[category];
}

export function getFilteredCategory(category) {
  console.log(category);
  if (searchForCategory(category, 'food') ||
    searchForCategory(category, 'coffee')) {
    return 'food';
  }
  if (searchForCategory(category, 'restaurants')) {
    return 'restaurants';
  }
  if (searchForCategory(category, 'shop')) {
    return 'shops';
  }
  if (searchForCategory(category, 'furniture')) {
    return 'furniture';
  }
  if (searchForCategory(category, 'convenience') ||
      searchForCategory(category, 'groceries')) {
    return 'groceries';
  }
  if (searchForCategory(category, 'pharmacies')) {
    return 'pharmacies';
  }
  if (searchForCategory(category, 'travel')) {
    return 'travel';
  }
  if (searchForCategory(category, 'electronics')) {
    return 'electronics';
  }
  if (searchForCategory(category, 'games')) {
    return 'game';
  }
  if (searchForCategory(category, 'education') ||
      searchForCategory(category, 'universities') ||
      searchForCategory(category, 'community')) {
    return 'education';
  }
  return 'unknown';
}
