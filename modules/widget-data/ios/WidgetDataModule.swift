import ExpoModulesCore

public class WidgetDataModule: Module {
  public func definition() -> ModuleDefinition {
    Name("WidgetData")

    Function("updateWidgetData") { (todayTaps: Int, totalTaps: Int, currentStreak: Int, itemName: String, iconName: String, iconColor: String, theme: String) in
      let defaults = UserDefaults(suiteName: "group.com.woodenfish.taptapjoy")
      let dict: [String: Any] = [
        "todayTaps": todayTaps,
        "totalTaps": totalTaps,
        "currentStreak": currentStreak,
        "currentItemName": itemName,
        "currentItemIcon": iconName,
        "currentItemColor": iconColor,
        "theme": theme
      ]
      defaults?.set(dict, forKey: "widgetData")
      defaults?.synchronize()
    }

    Function("getWidgetData") { () -> [String: Any] in
      let defaults = UserDefaults(suiteName: "group.com.woodenfish.taptapjoy")
      return defaults?.dictionary(forKey: "widgetData") as? [String: Any] ?? [:]
    }
  }
}
