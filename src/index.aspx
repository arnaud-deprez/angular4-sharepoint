<%@ Assembly Name="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
    <%@ Page Language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WikiEditPage" MasterPageFile="~masterurl/default.master"      MainContentID="PlaceHolderMain" %>
        <%@ Import Namespace="Microsoft.SharePoint.WebPartPages" %>
            <%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
                <%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
                    <%@ Import Namespace="Microsoft.SharePoint" %>
                        <%@ Assembly Name="Microsoft.Web.CommandUI, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
                            <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
                                <asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
                                    <SharePoint:ProjectProperty Property="Title" runat="server" /> -
                                    <SharePoint:ListItemProperty runat="server" />
                                </asp:Content>
                                <asp:Content ContentPlaceHolderId="PlaceHolderPageImage" runat="server">
                                    <SharePoint:AlphaImage ID=onetidtpweb1 Src="/_layouts/15/images/wiki.png?rev=44" Width=145 Height=54 Alt="" Runat="server" />
                                </asp:Content>
                                <asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
                                    <base href="/sites/ESB2/DBFISNUC/CertificatApp/">
                                    <meta name="CollaborationServer" content="SharePoint Team Web Site" />
                                    <link href="styles.[hash].bundle.css" rel="stylesheet" />
                                    <SharePoint:ScriptBlock runat="server">
                                        var navBarHelpOverrideKey = "WSSEndUser";
                                    </SharePoint:ScriptBlock>
                                    <SharePoint:RssLink runat="server" />
                                </asp:Content>
                                <asp:Content ContentPlaceHolderId="PlaceHolderMiniConsole" runat="server">
                                    <SharePoint:FormComponent TemplateName="WikiMiniConsole" ControlMode="Display" runat="server" id="WikiMiniConsole" />
                                </asp:Content>
                                <asp:Content ContentPlaceHolderId="PlaceHolderLeftActions" runat="server">
                                    <SharePoint:RecentChangesMenu runat="server" id="RecentChanges" />
                                </asp:Content>
                                <asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
                                    <span id="wikiPageNameDisplay" style="display: none;" runat="server">
    <SharePoint:ListItemProperty runat="server"/>
</span>
                                    <span style="display:none;" id="wikiPageNameEdit" runat="server">
    <asp:TextBox id="wikiPageNameEditTextBox" runat="server" />
</span>
                                    <div>
                                        <app-root>
                                            <div class="app-loading">
                                                &nbsp;&nbsp; Loading Application...
                                            </div>
                                        </app-root>
                                        <!-- Place the compiled Js below-->
                                        <script type="text/javascript" src="app/inline.[hash].bundle.js"></script>
                                        <script type="text/javascript" src="app/polyfills.[hash].bundle.js"></script>
                                        <script type="text/javascript" src="app/vendor.[hash].bundle.js"></script>
                                        <script type="text/javascript" src="app/main.[hash].bundle.js"></script>
                                    </div>
                                    <SharePoint:VersionedPlaceHolder UIVersion="4" runat="server">
                                        <SharePoint:SPRibbonButton id="btnWikiEdit" RibbonCommand="Ribbon.WikiPageTab.EditAndCheckout.SaveEdit.Menu.SaveEdit.Edit" runat="server" Text="edit" />
                                        <SharePoint:SPRibbonButton id="btnWikiSave" RibbonCommand="Ribbon.WikiPageTab.EditAndCheckout.SaveEdit.Menu.SaveEdit.SaveAndStop" runat="server" Text="edit" />
                                        <SharePoint:SPRibbonButton id="btnWikiRevert" RibbonCommand="Ribbon.WikiPageTab.EditAndCheckout.SaveEdit.Menu.SaveEdit.Revert" runat="server" Text="Revert" />
                                    </SharePoint:VersionedPlaceHolder>
                                    <SharePoint:EmbeddedFormField id="WikiField" FieldName="WikiField" ControlMode="Display" runat="server" />
                                    <WebPartPages:WebPartZone runat="server" ID="Bottom" CssClass="ms-hide" Title="loc:Bottom" />
                                </asp:Content>