import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactPayload } from '../workers/api/contact/validation/contact.js';
const valid={name:'Visitor',email:'visitor@example.com',message:'Hello',category:'general',language:'en',page:'home'};
test('valid contact',()=>assert.equal(validateContactPayload(valid).ok,true));
test('invalid category',()=>assert.equal(validateContactPayload({...valid,category:'unknown'}).status,422));
test('rejects markup and length',()=>{assert.equal(validateContactPayload({...valid,message:'<script>x</script>'}).status,422);assert.equal(validateContactPayload({...valid,message:'x'.repeat(3001)}).status,422);});
