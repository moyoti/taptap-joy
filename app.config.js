const { withXcodeProject, withEntitlementsPlist } = require('@expo/config-plugins');

const appGroup = 'group.com.woodenfish.taptapjoy';

function withWidget(config) {
  config = withEntitlementsPlist(config, (cfg) => {
    const groups = cfg.modResults['com.apple.security.application-groups'] || [];
    if (!groups.includes(appGroup)) groups.push(appGroup);
    cfg.modResults['com.apple.security.application-groups'] = groups;
    return cfg;
  });
  return config;
}

module.exports = ({ config }) => {
  config.plugins = [...(config.plugins || []), withWidget];
  return config;
};
