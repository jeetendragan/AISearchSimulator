export class NodeStateInSearchColorMapper{
    private static COLOR_MAP = {
        "CURRENT" : "#000",
        "VISITED" : "#F7F701",
        "NOT_VISITED" : "#FFF"
    }

    public static GetColorForCurrentNode() : string{
        return this.COLOR_MAP['CURRENT'];
    }

    public static GetColorForVisitedNode() : string{
        return this.COLOR_MAP['VISITED'];
    }

    public static GetColorForNotVisitedNode() : string{
        return this.COLOR_MAP['NOT_VISITED'];
    }

}