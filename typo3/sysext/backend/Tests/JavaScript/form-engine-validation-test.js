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
import FormEngineValidation from"@typo3/backend/form-engine-validation.js";describe("TYPO3/CMS/Backend/FormEngineValidationTest:",(()=>{const e=[{description:"works for type date",type:"date",value:0,config:{},result:""},{description:"works for type date with timestamp",type:"date",value:1e7,config:{},result:"26-04-1970"},{description:"works for type date with iso date",type:"date",value:"2016-12-02T11:16:06+00:00",config:{},result:"02-12-2016"},{description:"works for type datetime",type:"datetime",value:0,config:{},result:""},{description:"works for type datetime with timestamp",type:"datetime",value:1e7,config:{},result:"17:46 26-04-1970"},{description:"works for type datetime with iso date",type:"datetime",value:"2016-12-02T11:16:06+00:00",config:{},result:"11:16 02-12-2016"},{description:"resolves to empty result for zero value",type:"datetime",value:0,config:{},result:""},{description:"resolves to empty result for invalid value",type:"datetime",value:"invalid",config:{},result:""},{description:"works for type time",type:"time",value:0,config:{},result:"00:00"},{description:"works for type time with timestamp",type:"time",value:1e7,config:{},result:"17:46"},{description:"works for type time with iso date",type:"time",value:"2016-12-02T11:16:06+00:00",config:{},result:"11:16"}];describe("tests for formatValue",(()=>{using(e,(function(e){it(e.description,(()=>{FormEngineValidation.initialize();const t=FormEngineValidation.formatValue(e.type,e.value,e.config);expect(t).toBe(e.result)}))}))}));const t=[{description:"works for command alpha with numeric value",command:"alpha",value:"1234",config:{},result:""},{description:"works for command alpha with string value",command:"alpha",value:"abc",config:{},result:"abc"},{description:"works for command alpha with alphanum input",command:"alpha",value:"abc123",config:{},result:"abc"},{description:"works for command alpha with alphanum input",command:"alpha",value:"123abc123",config:{},result:"abc"}];describe("test for processValue",(()=>{using(t,(function(e){it(e.description,(()=>{const t=FormEngineValidation.processValue(e.command,e.value,e.config);expect(t).toBe(e.result)}))}))})),xdescribe("tests for validateField",(()=>{})),describe("tests for trimExplode",(()=>{it("works for comma as separator and list without spaces",(()=>{expect(FormEngineValidation.trimExplode(",","foo,bar,baz")).toEqual(["foo","bar","baz"])})),it("works for comma as separator and list with spaces",(()=>{expect(FormEngineValidation.trimExplode(","," foo , bar , baz ")).toEqual(["foo","bar","baz"])})),it("works for pipe as separator and list with spaces",(()=>{expect(FormEngineValidation.trimExplode("|"," foo | bar | baz ")).toEqual(["foo","bar","baz"])}))})),describe("tests for parseInt",(()=>{it("works for value 0",(()=>{expect(FormEngineValidation.parseInt(0)).toBe(0)})),it("works for value 1",(()=>{expect(FormEngineValidation.parseInt(1)).toBe(1)})),it("works for value -1",(()=>{expect(FormEngineValidation.parseInt(-1)).toBe(-1)})),it('works for value "0"',(()=>{expect(FormEngineValidation.parseInt("0")).toBe(0)})),it('works for value "1"',(()=>{expect(FormEngineValidation.parseInt("1")).toBe(1)})),it('works for value "-1"',(()=>{expect(FormEngineValidation.parseInt("-1")).toBe(-1)})),it("works for value 0.5",(()=>{expect(FormEngineValidation.parseInt(.5)).toBe(0)})),it('works for value "0.5"',(()=>{expect(FormEngineValidation.parseInt("0.5")).toBe(0)})),it('works for value "foo"',(()=>{expect(FormEngineValidation.parseInt("foo")).toBe(0)})),it("works for value true",(()=>{expect(FormEngineValidation.parseInt(!0)).toBe(0)})),it("works for value false",(()=>{expect(FormEngineValidation.parseInt(!1)).toBe(0)})),it("works for value null",(()=>{expect(FormEngineValidation.parseInt(null)).toBe(0)}))})),describe("tests for parseDouble",(()=>{it("works for value 0",(()=>{expect(FormEngineValidation.parseDouble(0)).toBe("0.00")})),it("works for value 1",(()=>{expect(FormEngineValidation.parseDouble(1)).toBe("1.00")})),it("works for value -1",(()=>{expect(FormEngineValidation.parseDouble(-1)).toBe("-1.00")})),it('works for value "0"',(()=>{expect(FormEngineValidation.parseDouble("0")).toBe("0.00")})),it('works for value "1"',(()=>{expect(FormEngineValidation.parseDouble("1")).toBe("1.00")})),it('works for value "-1"',(()=>{expect(FormEngineValidation.parseDouble("-1")).toBe("-1.00")})),it("works for value 0.5",(()=>{expect(FormEngineValidation.parseDouble(.5)).toBe("0.50")})),it('works for value "0.5"',(()=>{expect(FormEngineValidation.parseDouble("0.5")).toBe("0.50")})),it('works for value "foo"',(()=>{expect(FormEngineValidation.parseDouble("foo")).toBe("0.00")})),it("works for value true",(()=>{expect(FormEngineValidation.parseDouble(!0)).toBe("0.00")})),it("works for value false",(()=>{expect(FormEngineValidation.parseDouble(!1)).toBe("0.00")})),it("works for value null",(()=>{expect(FormEngineValidation.parseDouble(null)).toBe("0.00")}))})),describe("tests for btrim",(()=>{const e=FormEngineValidation.btrim(" test ");it("works for string with whitespace in begin and end",(()=>{expect(e).toBe(" test")}))})),describe("tests for ltrim",(()=>{const e=FormEngineValidation.ltrim(" test ");it("works for string with whitespace in begin and end",(()=>{expect(e).toBe("test ")}))})),xdescribe("tests for parseDateTime",(()=>{})),xdescribe("tests for parseDate",(()=>{})),xdescribe("tests for parseTime",(()=>{})),xdescribe("tests for parseYear",(()=>{})),describe("tests for getYear",(()=>{const e=new Date;afterEach((()=>{jasmine.clock().mockDate(e)})),it("works for current date",(()=>{const e=new Date;expect(FormEngineValidation.getYear(e)).toBe(e.getFullYear())})),it("works for year 2013",(()=>{const e=new Date(2013,9,23);jasmine.clock().mockDate(e),expect(FormEngineValidation.getYear(e)).toBe(2013)}))})),describe("tests for getDate",(()=>{const e=new Date;afterEach((()=>{jasmine.clock().mockDate(e)})),xit("works for year 2013",(()=>{const e=new Date(2013,9,23,13,13,13);jasmine.clock().mockDate(e),expect(FormEngineValidation.getDate(e)).toBe(1382479200)}))})),describe("tests for splitStr",(()=>{it("works for command and index",(()=>{expect(FormEngineValidation.splitStr("foo,bar,baz",",",-1)).toBe("foo"),expect(FormEngineValidation.splitStr("foo,bar,baz",",",0)).toBe("foo"),expect(FormEngineValidation.splitStr("foo,bar,baz",",",1)).toBe("foo"),expect(FormEngineValidation.splitStr("foo,bar,baz",",",2)).toBe("bar"),expect(FormEngineValidation.splitStr("foo,bar,baz",",",3)).toBe("baz"),expect(FormEngineValidation.splitStr(" foo , bar , baz ",",",1)).toBe(" foo "),expect(FormEngineValidation.splitStr(" foo , bar , baz ",",",2)).toBe(" bar "),expect(FormEngineValidation.splitStr(" foo , bar , baz ",",",3)).toBe(" baz ")}))})),xdescribe("tests for split",(()=>{}))}));