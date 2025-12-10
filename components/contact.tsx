import { Button } from "@/components/ui/button"

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-card/50 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started</h2>
          <p className="text-muted-foreground mb-8">
            Developed by the University of Southeastern Philippines (USeP) in partnership with local government units.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6">
              REQUEST PARTNERSHIP
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 px-8 py-6 bg-transparent"
            >
              CONTACT US
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Project Inquiry: <span className="text-accent">inquiry@drrm-insighthub.ph</span>
          </p>
        </div>
      </div>
    </section>
  )
}
