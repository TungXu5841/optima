/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 */
import $ from 'jquery';

export default class Form {
  init() {
    this.parentFocus();
    this.togglePasswordVisibility();
  }

  parentFocus() {
    $('.js-child-focus').on('focus', function () {
      $(this).closest('.js-parent-focus').addClass('focus');
    });
    $('.js-child-focus').on('focusout', function () {
      $(this).closest('.js-parent-focus').removeClass('focus');
    });
  }

  togglePasswordVisibility() {
    $('button[data-action="show-password"]').on('click', function () {
      const elm = $(this).closest('.input-group').children('input.js-visible-password');

      if (elm.attr('type') === 'password') {
        elm.attr('type', 'text');
        $(this).text($(this).data('textHide'));
      } else {
        elm.attr('type', 'password');
        $(this).text($(this).data('textShow'));
      }
    });
  }
}
