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
import{ImmediateActionElement}from"@typo3/backend/element/immediate-action-element.js";import moduleMenuApp from"@typo3/backend/module-menu.js";import viewportObject from"@typo3/backend/viewport.js";describe("TYPO3/CMS/Backend/Element/ImmediateActionElement:",(()=>{let e;beforeEach((()=>{e=document.createElement("div"),document.body.appendChild(e)})),afterEach((()=>{e.remove(),e=null})),it("dispatches action when created via constructor",(async()=>{const t=viewportObject.Topbar,n={refresh:()=>{}};spyOn(n,"refresh").and.callThrough(),viewportObject.Topbar=n;const o=new ImmediateActionElement;o.setAttribute("action","TYPO3.Backend.Topbar.refresh"),expect(n.refresh).not.toHaveBeenCalled(),e.appendChild(o),await import("@typo3/backend/viewport.js"),await new Promise((e=>setTimeout(e,100))),expect(n.refresh).toHaveBeenCalled(),viewportObject.Topbar=t})),it("dispatches action when created via createElement",(async()=>{const t=viewportObject.Topbar,n={refresh:()=>{}};spyOn(n,"refresh").and.callThrough(),viewportObject.Topbar=n;const o=document.createElement("typo3-immediate-action");o.setAttribute("action","TYPO3.Backend.Topbar.refresh"),expect(n.refresh).not.toHaveBeenCalled(),e.appendChild(o),await import("@typo3/backend/viewport.js"),await new Promise((e=>setTimeout(e,100))),expect(n.refresh).toHaveBeenCalled(),viewportObject.Topbar=t})),it("dispatches action when created from string",(async()=>{const t=moduleMenuApp.App,n={refreshMenu:()=>{}};spyOn(n,"refreshMenu").and.callThrough(),moduleMenuApp.App=n;const o=document.createRange().createContextualFragment('<typo3-immediate-action action="TYPO3.ModuleMenu.App.refreshMenu"></typo3-immediate-action>').querySelector("typo3-immediate-action");expect(n.refreshMenu).not.toHaveBeenCalled(),e.appendChild(o),await import("@typo3/backend/module-menu.js"),await new Promise((e=>setTimeout(e,100))),expect(n.refreshMenu).toHaveBeenCalled(),viewportObject.App=t})),it("dispatches action when created via innerHTML",(async()=>{const t=moduleMenuApp.App,n={refreshMenu:()=>{}};spyOn(n,"refreshMenu").and.callThrough(),moduleMenuApp.App=n,e.innerHTML='<typo3-immediate-action action="TYPO3.ModuleMenu.App.refreshMenu"></typo3-immediate-action>',await import("@typo3/backend/module-menu.js"),await new Promise((e=>setTimeout(e,100))),expect(n.refreshMenu).toHaveBeenCalled(),moduleMenuApp.App=t}))}));