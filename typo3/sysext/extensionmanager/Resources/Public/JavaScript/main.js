/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
import $ from"jquery";import BrowserSession from"@typo3/backend/storage/browser-session.js";import NProgress from"nprogress";import Modal from"@typo3/backend/modal.js";import Tooltip from"@typo3/backend/tooltip.js";import Severity from"@typo3/backend/severity.js";import SecurityUtility from"@typo3/core/security-utility.js";import ExtensionManagerRepository from"@typo3/extensionmanager/repository.js";import ExtensionManagerUpdate from"@typo3/extensionmanager/update.js";import ExtensionManagerUploadForm from"@typo3/extensionmanager/upload-form.js";import Tablesort from"tablesort";import"tablesort.dotsep.js";import"@typo3/backend/input/clearable.js";import AjaxRequest from"@typo3/core/ajax/ajax-request.js";import DebounceEvent from"@typo3/core/event/debounce-event.js";import RegularEvent from"@typo3/core/event/regular-event.js";const securityUtility=new SecurityUtility;var ExtensionManagerIdentifier;!function(e){e.extensionlist="typo3-extension-list",e.searchField="#Tx_Extensionmanager_extensionkey"}(ExtensionManagerIdentifier||(ExtensionManagerIdentifier={}));class ExtensionManager{constructor(){this.searchFilterSessionKey="tx-extensionmanager-local-filter";const e=this;$((()=>{this.Update=new ExtensionManagerUpdate,this.UploadForm=new ExtensionManagerUploadForm,this.Repository=new ExtensionManagerRepository;const t=document.getElementById(ExtensionManagerIdentifier.extensionlist);let n;if(null!==t&&(new Tablesort(t),new RegularEvent("click",(function(t){t.preventDefault(),Modal.confirm(TYPO3.lang["extensionList.removalConfirmation.title"],TYPO3.lang["extensionList.removalConfirmation.question"],Severity.error,[{text:TYPO3.lang["button.cancel"],active:!0,btnClass:"btn-default",trigger:()=>{Modal.dismiss()}},{text:TYPO3.lang["button.remove"],btnClass:"btn-danger",trigger:()=>{e.removeExtensionFromDisk(this),Modal.dismiss()}}])})).delegateTo(t,".removeExtension")),$(document).on("click",".onClickMaskExtensionManager",(()=>{NProgress.start()})).on("click","a[data-action=update-extension]",(e=>{e.preventDefault(),NProgress.start(),new AjaxRequest($(e.currentTarget).attr("href")).get().then(this.updateExtension)})).on("change","input[name=unlockDependencyIgnoreButton]",(e=>{$(".t3js-dependencies").toggleClass("disabled",!$(e.currentTarget).prop("checked"))})),null!==(n=document.querySelector(ExtensionManagerIdentifier.searchField))){const e=BrowserSession.get(this.searchFilterSessionKey);null!==e&&(n.value=e,this.filterExtensions(e)),new RegularEvent("submit",(e=>{e.preventDefault()})).bindTo(n.closest("form")),new DebounceEvent("input",(e=>{const t=e.target;BrowserSession.set(this.searchFilterSessionKey,t.value),this.filterExtensions(t.value)}),100).bindTo(n),n.clearable({onClear:()=>{BrowserSession.unset(this.searchFilterSessionKey),this.filterExtensions("")}})}$(document).on("click",".t3-button-action-installdistribution",(()=>{NProgress.start()})),this.Repository.initDom(),this.Update.initializeEvents(),this.UploadForm.initializeEvents(),Tooltip.initialize("#typo3-extension-list [title]")}))}filterExtensions(e){const t=document.querySelectorAll("[data-filterable]"),n=[];t.forEach((e=>{const t=Array.from(e.parentElement.children);n.push(t.indexOf(e))}));document.querySelectorAll("#typo3-extension-list tbody tr").forEach((t=>{const o=n.map((e=>t.children.item(e))),i=[];o.forEach((e=>{i.push(e.textContent.trim().replace(/\s+/g," "))})),t.classList.toggle("hidden",""!==e&&!RegExp(e,"i").test(i.join(":")))}))}removeExtensionFromDisk(e){NProgress.start(),new AjaxRequest(e.href).get().then((()=>{location.reload()})).finally((()=>{NProgress.done()}))}async updateExtension(e){let t=0;const n=await e.resolve(),o=$("<form>");$.each(n.updateComments,((e,n)=>{const i=$("<input>").attr({type:"radio",name:"version"}).val(e);0===t&&i.attr("checked","checked"),o.append([$("<h3>").append([i," "+securityUtility.encodeHtml(e)]),$("<div>").append(n.replace(/(\r\n|\n\r|\r|\n)/g,"\n").split(/\n/).map((e=>securityUtility.encodeHtml(e))).join("<br>"))]),t++}));const i=$("<div>").append([$("<h1>").text(TYPO3.lang["extensionList.updateConfirmation.title"]),$("<h2>").text(TYPO3.lang["extensionList.updateConfirmation.message"]),o]);NProgress.done(),Modal.confirm(TYPO3.lang["extensionList.updateConfirmation.questionVersionComments"],i,Severity.warning,[{text:TYPO3.lang["button.cancel"],active:!0,btnClass:"btn-default",trigger:()=>{Modal.dismiss()}},{text:TYPO3.lang["button.updateExtension"],btnClass:"btn-warning",trigger:()=>{NProgress.start(),new AjaxRequest(n.url).withQueryArguments({version:$("input:radio[name=version]:checked",Modal.currentModal).val()}).get().finally((()=>{location.reload()})),Modal.dismiss()}}])}}let extensionManagerObject=new ExtensionManager;void 0===TYPO3.ExtensionManager&&(TYPO3.ExtensionManager=extensionManagerObject);export default extensionManagerObject;