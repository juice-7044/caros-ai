/** Shared rest-space erosion handoff adapted from the Meng To MIT demo; see renderer doc. */
export const erosionField = `
uniform vec3 brush;
uniform float amount;
uniform float globalMode;
float erosion(vec3 p) {
  float grain=.038*sin(dot(p,vec3(19.,11.,9.)))+.023*cos(dot(p,vec3(-14.,29.,23.)));
  float localField=clamp(.08+distance(p,brush)*.92+grain,.04,2.5);
  float globalField=.18+.74*(.5+.5*sin(dot(p,vec3(2.7,4.1,2.3))))+grain;
  return mix(localField,globalField,globalMode);
}
`;
export const particleVertex = erosionField + `
uniform float clock, density, morph;
attribute vec3 targetHome, targetNormal;
attribute float seed;
varying float alpha, tone;
void main(){
  vec3 home=mix(position,targetHome,morph);
  vec3 n=normalize(mix(normal,targetNormal,morph)+vec3(.00001));
  float d=erosion(home);
  float freed=smoothstep(d-.045,d+.13,amount);
  alpha=freed*smoothstep(0.,.06,amount);tone=seed;
  float spread=seed<.65?.07:(seed<.91?.3:.72);
  vec3 flow=vec3(sin(home.y*3.+clock*1.3+seed*4.),cos(home.z*4.+clock+seed*3.),sin(home.x*3.-clock));
  float flight=sin(morph*3.14159265);
  vec3 p=home+freed*spread*(n*.63+flow*.5+vec3(.2,.2,0.));
  p+=flight*vec3(sin(seed*31.)*.48,sin(seed*19.)*.48,cos(seed*27.)*.55);
  vec4 mv=modelViewMatrix*vec4(p,1.);
  gl_Position=projectionMatrix*mv;
  gl_PointSize=clamp(density*(1.15+1.65*seed)*(6./max(3.,-mv.z)),1.,5.);
}
`;
export const particleFragment = `
varying float alpha,tone;
void main(){
 float r=length(gl_PointCoord-.5);if(r>.5||alpha<.01)discard;
 vec3 c=mix(vec3(.47,.245,.06),vec3(1.,.81,.38),tone);
 if(tone>.95)c=vec3(1.,.94,.72);
 gl_FragColor=vec4(c,alpha*(1.-smoothstep(.21,.5,r)));
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
}
`;
